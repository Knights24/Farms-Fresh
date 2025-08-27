import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isUsingMockDB, mockDB } from '@/lib/database';
import { User } from '@/lib/models';
import { generateToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    let user;
    let isValidPassword = false;

    if (isUsingMockDB()) {
      // Use mock database
      console.log('🔍 Using Mock Database for authentication');
      user = await mockDB.findUser({ email });
      if (user) {
        isValidPassword = await bcrypt.compare(password, user.password);
      }
    } else {
      // Use MongoDB
      console.log('🔍 Using MongoDB for authentication');
      user = await User.findOne({ email }).select('+password');
      if (user) {
        isValidPassword = await bcrypt.compare(password, user.password);
      }
    }
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isVerified: user.isVerified,
    };

    console.log('✅ Login successful for user:', user.email);

    return NextResponse.json({
      success: true,
      data: {
        user: userResponse,
        token,
        expiresIn: '24h'
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Mock logout - in a real app, you might want to blacklist tokens
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
