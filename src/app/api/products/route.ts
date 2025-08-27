import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { validateProduct } from '@/lib/db-utils';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build query
    let query: any = { isActive: true };

    // Filter by category
    if (category && category !== 'all' && category !== 'All') {
      query.category = new RegExp(category, 'i');
    }

    // Filter by search term
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { tags: { $in: [searchRegex] } }
      ];
    }

    // Build sort object
    let sortQuery: any = {};
    if (sort) {
      switch (sort) {
        case 'price-asc':
          sortQuery.price = 1;
          break;
        case 'price-desc':
          sortQuery.price = -1;
          break;
        case 'name-asc':
          sortQuery.name = 1;
          break;
        case 'name-desc':
          sortQuery.name = -1;
          break;
        case 'rating':
          sortQuery.rating = -1;
          break;
        default:
          sortQuery.createdAt = -1;
      }
    } else {
      sortQuery.createdAt = -1;
    }

    // Execute query with pagination
    const [products, totalCount] = await Promise.all([
      Product.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalProducts: totalCount,
          productsPerPage: limit
        }
      }
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const productData = await request.json();
    
    // Validate product data
    const validation = validateProduct(productData);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    const product = new Product(productData);
    await product.save();

    return NextResponse.json({
      success: true,
      data: product
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
