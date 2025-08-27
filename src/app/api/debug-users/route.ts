import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();
    
    // Get all users (without passwords for security)
    const users = await User.find({}).select('-password');
    
    // Check specifically for admin user
    const adminUser = await User.findOne({ email: 'admin@farmfresh.com' }).select('+password');
    
    let passwordCheck = null;
    if (adminUser) {
      // Test password verification
      passwordCheck = {
        storedPasswordLength: adminUser.password.length,
        isPasswordHashed: adminUser.password.startsWith('$2a$') || adminUser.password.startsWith('$2b$'),
        testPassword: await bcrypt.compare('admin123', adminUser.password)
      };
    }
    
    return NextResponse.json({
      success: true,
      data: {
        totalUsers: users.length,
        users: users.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        })),
        adminUserExists: !!adminUser,
        passwordCheck
      }
    });
    
  } catch (error) {
    console.error('❌ Debug users error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Database error'
    }, { status: 500 });
  }
}
