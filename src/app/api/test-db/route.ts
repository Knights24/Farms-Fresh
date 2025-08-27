import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    console.log('🔌 Testing database connection...');
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@farmfresh.com' });
    
    if (!adminExists) {
      console.log('👤 Creating admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      const adminUser = new User({
        name: 'Farm Fresh Admin',
        email: 'admin@farmfresh.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
      
      return NextResponse.json({
        success: true,
        message: 'Admin user created successfully',
        data: {
          email: 'admin@farmfresh.com',
          password: 'admin123'
        }
      });
    } else {
      console.log('✅ Admin user already exists');
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists',
        data: {
          email: 'admin@farmfresh.com',
          password: 'admin123'
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Database connection failed'
    }, { status: 500 });
  }
}
