import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import { hashPassword } from '@/lib/db-utils';
import { produce } from '@/lib/data';

export async function seedDatabase() {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...');

    // Clear existing data (optional - be careful in production)
    // await Product.deleteMany({});
    // await User.deleteMany({});

    // Check if products already exist
    const existingProductsCount = await Product.countDocuments();
    if (existingProductsCount === 0) {
      console.log('📦 Seeding products...');
      
      // Transform existing product data for MongoDB
      const productsData = produce.map(product => ({
        ...product,
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 100) + 10,
        organic: true,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3-5 rating
        reviewCount: Math.floor(Math.random() * 50) + 5,
        isActive: true,
        tags: generateTags(product.name, product.category),
        farmerName: generateFarmerName(),
        origin: generateOrigin()
      }));

      await Product.insertMany(productsData);
      console.log(`✅ Seeded ${productsData.length} products`);
    } else {
      console.log(`📦 ${existingProductsCount} products already exist, skipping product seeding`);
    }

    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: 'admin@farmsfresh.com' });
    if (!existingAdmin) {
      console.log('👤 Creating admin user...');
      
      const adminPassword = await hashPassword('admin123');
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@farmsfresh.com',
        password: adminPassword,
        role: 'admin',
        phone: '9876543210',
        isVerified: true,
        address: {
          street: 'Admin Street',
          city: 'Ahmedabad',
          state: 'Gujarat',
          pincode: '380001'
        }
      });

      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      console.log('👤 Admin user already exists, skipping');
    }

    // Create sample farmer users
    const existingFarmersCount = await User.countDocuments({ role: 'farmer' });
    if (existingFarmersCount === 0) {
      console.log('🧑‍🌾 Creating farmer users...');
      
      const farmers = [
        {
          name: 'Ramesh Patel',
          email: 'ramesh.farmer@farmsfresh.com',
          password: await hashPassword('farmer123'),
          role: 'farmer' as const,
          phone: '9876543211',
          isVerified: true,
          address: {
            street: 'Farm Road 1',
            city: 'Anand',
            state: 'Gujarat',
            pincode: '388001'
          }
        },
        {
          name: 'Sunita Sharma',
          email: 'sunita.farmer@farmsfresh.com',
          password: await hashPassword('farmer123'),
          role: 'farmer' as const,
          phone: '9876543212',
          isVerified: true,
          address: {
            street: 'Village Farm',
            city: 'Vadodara',
            state: 'Gujarat',
            pincode: '390001'
          }
        }
      ];

      await User.insertMany(farmers);
      console.log(`✅ Created ${farmers.length} farmer users`);
    } else {
      console.log(`🧑‍🌾 ${existingFarmersCount} farmers already exist, skipping`);
    }

    console.log('🎉 Database seeding completed successfully!');
    
    return {
      success: true,
      message: 'Database seeded successfully'
    };

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown seeding error'
    };
  }
}

// Helper functions
function generateTags(productName: string, category: string): string[] {
  const commonTags = ['fresh', 'organic', 'healthy'];
  const categoryTags = {
    'Vegetables': ['vegetable', 'nutritious', 'green'],
    'Fruits': ['fruit', 'sweet', 'vitamin'],
    'Dairy': ['dairy', 'protein', 'calcium'],
    'Pantry': ['pantry', 'essential', 'cooking']
  };

  return [
    ...commonTags,
    ...(categoryTags[category as keyof typeof categoryTags] || []),
    ...productName.toLowerCase().split(' ').slice(0, 2)
  ];
}

function generateFarmerName(): string {
  const names = [
    'Ramesh Patel', 'Sunita Sharma', 'Vikram Singh', 'Meera Devi',
    'Ashok Kumar', 'Lakshmi Nair', 'Ravi Gupta', 'Priya Reddy'
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function generateOrigin(): string {
  const origins = [
    'Anand, Gujarat', 'Nashik, Maharashtra', 'Bangalore, Karnataka',
    'Ooty, Tamil Nadu', 'Pune, Maharashtra', 'Vadodara, Gujarat'
  ];
  return origins[Math.floor(Math.random() * origins.length)];
}
