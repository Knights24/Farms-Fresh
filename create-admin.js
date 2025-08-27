// Quick script to create admin user
import connectDB from './src/lib/mongodb';
import { User } from './src/lib/models';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@farmfresh.com' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Create admin user
    const adminUser = new User({
      name: 'Farm Fresh Admin',
      email: 'admin@farmfresh.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@farmfresh.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

createAdminUser();
