import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product, Category } from '@/lib/models';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdminAuth(request);
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';

    const query: any = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    } else if (status === 'low-stock') {
      query.stock = { $lt: 10 };
    }

    const skip = (page - 1) * limit;
    
    const [products, totalProducts] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Admin products fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdminAuth(request);
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const productData = await request.json();
    
    await connectDB();

    // Validate required fields
    const requiredFields = ['name', 'price', 'unit', 'category', 'description', 'imageUrl'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const product = new Product({
      ...productData,
      stock: productData.stock || 0,
      isActive: productData.isActive !== false
    });

    await product.save();

    // Update category product count
    await Category.findOneAndUpdate(
      { name: productData.category },
      { $inc: { productCount: 1 } }
    );

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Admin product creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
