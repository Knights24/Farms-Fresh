import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import { hashPassword, generateToken, validateEmail } from '@/lib/db-utils';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password, name, phone, address } = await request.json();
    
    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Email validation
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const userData = {
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      role: 'customer',
      isVerified: false,
      address: address || {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    };

    const user = new User(userData);
    await user.save();

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    // User response without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isVerified: user.isVerified,
      address: user.address
    };

    return NextResponse.json({
      success: true,
      data: {
        user: userResponse,
        token,
        message: 'User registered successfully'
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
