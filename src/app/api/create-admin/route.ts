import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectDB();
    
    // Delete existing admin user
    await User.deleteOne({ email: 'admin@farmfresh.com' });
    console.log('🗑️ Deleted existing admin user');
    
    // Create new admin user with proper password hashing
    const hashedPassword = await bcrypt.hash('admin123', 12);
    console.log('🔐 Password hashed:', hashedPassword.substring(0, 20) + '...');
    
    const adminUser = new User({
      name: 'Farm Fresh Admin',
      email: 'admin@farmfresh.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    const savedUser = await adminUser.save();
    console.log('✅ New admin user created:', savedUser._id);
    
    // Verify the user can be found and password works
    const testUser = await User.findOne({ email: 'admin@farmfresh.com' }).select('+password');
    const passwordWorks = await bcrypt.compare('admin123', testUser.password);
    
    return NextResponse.json({
      success: true,
      message: 'Admin user recreated successfully',
      data: {
        userId: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
        passwordTest: passwordWorks
      }
    });
    
  } catch (error) {
    console.error('❌ Create admin error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create admin user'
    }, { status: 500 });
  }
}
