import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { buildOrderFilter, getPaginationParams, generateOrderId } from '@/lib/db-utils';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(searchParams);
    
    // Get filter from search params
    const filter = buildOrderFilter(searchParams);
    
    // Build sort
    const sort = searchParams.get('sort') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder === 'desc' ? -1 : 1 };

    // Execute query with pagination
    const [orders, totalCount] = await Promise.all([
      Order.find(filter)
        .populate('items.productId', 'name price image')
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalOrders: totalCount,
          ordersPerPage: limit
        }
      }
    });
  } catch (error) {
    console.error('Orders API GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const orderData = await request.json();
    
    // Generate order ID and set defaults
    const orderPayload = {
      ...orderData,
      orderId: generateOrderId(),
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const order = new Order(orderPayload);
    await order.save();

    // Populate the product details for response
    await order.populate('items.productId', 'name price image');

    return NextResponse.json({
      success: true,
      data: order
    }, { status: 201 });
  } catch (error) {
    console.error('Orders API POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
