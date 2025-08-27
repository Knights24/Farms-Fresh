import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User, Product } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    console.log('🌱 Starting database seeding...');
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing data');
    
    // Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      name: 'Farm Fresh Admin',
      email: 'admin@farmfresh.com',
      password: adminPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('✅ Admin user created');
    
    // Create Customer User
    const customerPassword = await bcrypt.hash('customer123', 12);
    const customerUser = new User({
      name: 'John Customer',
      email: 'customer@farmfresh.com',
      password: customerPassword,
      role: 'customer'
    });
    await customerUser.save();
    console.log('✅ Customer user created');
    
    // Create Sample Products
    const sampleProducts = [
      {
        name: 'Fresh Tomatoes',
        price: 80,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1546470427-e3d3b46a3f15?w=400&h=400&fit=crop',
        category: 'Vegetables',
        description: 'Fresh organic tomatoes, perfect for salads and cooking. Rich in vitamins and antioxidants.',
        stock: 50,
        isActive: true
      },
      {
        name: 'Green Spinach',
        price: 60,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
        category: 'Vegetables',
        description: 'Fresh green spinach leaves, rich in iron and vitamins. Great for healthy meals.',
        stock: 30,
        isActive: true
      },
      {
        name: 'Red Apples',
        price: 150,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop',
        category: 'Fruits',
        description: 'Crisp and sweet red apples, perfect for snacking or baking. High in fiber and vitamins.',
        stock: 75,
        isActive: true
      },
      {
        name: 'Fresh Bananas',
        price: 40,
        unit: 'dozen',
        imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
        category: 'Fruits',
        description: 'Ripe yellow bananas, great source of potassium and natural energy. Perfect for smoothies.',
        stock: 100,
        isActive: true
      },
      {
        name: 'Fresh Milk',
        price: 55,
        unit: 'liter',
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
        category: 'Dairy',
        description: 'Pure fresh milk from local farms. Rich in calcium and protein.',
        stock: 25,
        isActive: true
      },
      {
        name: 'Farm Eggs',
        price: 120,
        unit: 'dozen',
        imageUrl: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400&h=400&fit=crop',
        category: 'Dairy',
        description: 'Fresh farm eggs from free-range chickens. Perfect for all cooking needs.',
        stock: 40,
        isActive: true
      },
      {
        name: 'Organic Carrots',
        price: 70,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=400&fit=crop',
        category: 'Vegetables',
        description: 'Organic carrots, perfect for cooking or raw snacking. High in beta-carotene.',
        stock: 35,
        isActive: true
      },
      {
        name: 'Fresh Oranges',
        price: 90,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop',
        category: 'Fruits',
        description: 'Juicy fresh oranges, loaded with vitamin C. Great for fresh juice or snacking.',
        stock: 60,
        isActive: true
      }
    ];
    
    // Insert all products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${insertedProducts.length} sample products`);
    
    // Verify data
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const adminExists = await User.findOne({ email: 'admin@farmfresh.com' }).select('+password');
    const passwordTest = await bcrypt.compare('admin123', adminExists.password);
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with sample data!',
      data: {
        users: {
          total: userCount,
          admin: {
            email: 'admin@farmfresh.com',
            password: 'admin123',
            role: 'admin'
          },
          customer: {
            email: 'customer@farmfresh.com',
            password: 'customer123',
            role: 'customer'
          }
        },
        products: {
          total: productCount,
          categories: ['Vegetables', 'Fruits', 'Dairy']
        },
        tests: {
          adminPasswordWorks: passwordTest,
          databaseConnection: 'success'
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Seeding failed'
    }, { status: 500 });
  }
}
