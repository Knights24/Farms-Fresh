import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User, Product } from '@/lib/models';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Get database info
    const dbName = mongoose.connection.db?.databaseName || 'farmfresh';
    const collections = mongoose.connection.db ? 
      await mongoose.connection.db.listCollections().toArray() : [];
    
    // Get all users (without passwords)
    const users = await User.find({}).select('-password').lean();
    
    // Get all products
    const products = await Product.find({}).lean();
    
    // Calculate statistics
    const userStats: Record<string, number> = users.reduce((acc: Record<string, number>, user: any) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    
    const productStats: Record<string, number> = products.reduce((acc: Record<string, number>, product: any) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    
    const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    
    return NextResponse.json({
      success: true,
      data: {
        database: {
          name: dbName,
          collections: collections.map(c => c.name),
          connectionString: process.env.MONGODB_URI ? 'MongoDB Atlas Connected' : 'No connection string'
        },
        users: {
          total: users.length,
          byRole: userStats,
          data: users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
          }))
        },
        products: {
          total: products.length,
          byCategory: productStats,
          totalStock,
          totalValue: Math.round(totalValue),
          activeProducts: products.filter(p => p.isActive).length,
          data: products.map(product => ({
            id: product._id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            category: product.category,
            stock: product.stock,
            isActive: product.isActive,
            createdAt: product.createdAt
          }))
        },
        summary: {
          totalDocuments: users.length + products.length,
          lastUpdated: new Date().toISOString(),
          mongodbVersion: mongoose.version,
          nodeVersion: process.version
        }
      }
    });
    
  } catch (error) {
    console.error('❌ MongoDB view error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch MongoDB data'
    }, { status: 500 });
  }
}
