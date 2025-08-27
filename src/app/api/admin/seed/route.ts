import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product, Category, User } from '@/lib/models';
import { produce } from '@/lib/data';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    // Check if admin user exists, if not create one
    const adminExists = await User.findOne({ email: 'admin@farmfresh.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await User.create({
        name: 'Farm Fresh Admin',
        email: 'admin@farmfresh.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+91-9876543210',
        isVerified: true
      });
      console.log('✅ Admin user created: admin@farmfresh.com');
    }

    // Seed categories
    const categories = [
      {
        name: 'Vegetables',
        description: 'Fresh organic vegetables',
        imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=300&h=300&fit=crop',
        productCount: 0
      },
      {
        name: 'Fruits',
        description: 'Seasonal fresh fruits',
        imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=300&fit=crop',
        productCount: 0
      },
      {
        name: 'Dairy',
        description: 'Farm fresh dairy products',
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
        productCount: 0
      },
      {
        name: 'Pantry',
        description: 'Essential pantry items',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop',
        productCount: 0
      }
    ];

    await Category.insertMany(categories);

    // Seed products with stock information
    const productsWithStock = produce.map(product => ({
      ...product,
      stock: Math.floor(Math.random() * 100) + 10, // Random stock between 10-110
      isActive: true
    }));

    await Product.insertMany(productsWithStock);

    // Update category product counts
    for (const category of categories) {
      const count = await Product.countDocuments({ category: category.name, isActive: true });
      await Category.updateOne({ name: category.name }, { productCount: count });
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        products: productsWithStock.length,
        categories: categories.length,
        adminCreated: !adminExists
      }
    });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
