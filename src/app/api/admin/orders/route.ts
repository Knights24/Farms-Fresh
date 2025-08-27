import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Order } from '@/lib/models';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authResult = await requireAdminAuth(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build query based on filters
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    // Get orders with customer information
    const orders = await Order.find(query)
      .populate('userId', 'name email phone')
      .populate('items.productId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(query);

    // Transform orders to include customer info
    const transformedOrders = orders.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber,
      customerName: order.userId?.name || order.customerInfo?.name || 'Guest User',
      customerEmail: order.userId?.email || order.customerInfo?.email || 'N/A',
      customerPhone: order.userId?.phone || order.customerInfo?.phone || 'N/A',
      items: order.items.map((item: any) => ({
        productId: item.productId?._id || item.productId,
        productName: item.productId?.name || item.productName || 'Unknown Product',
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: order.totalAmount,
      status: order.status,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));

    return NextResponse.json({
      success: true,
      data: {
        orders: transformedOrders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
          hasMore: skip + orders.length < totalOrders
        }
      }
    });

  } catch (error) {
    console.error('Admin orders fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
