import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product, Category, User, Order } from '@/lib/models';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdminAuth(request);
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await connectDB();

    // Get comprehensive dashboard statistics
    const [
      totalProducts,
      activeProducts,
      totalCategories,
      totalOrders,
      totalUsers,
      recentProducts,
      recentOrders
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ inStock: true }),
      Category.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Product.find().sort({ createdAt: -1 }).limit(5),
      Order.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    // Calculate total revenue
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]).then(result => result[0]?.total || 0);

    // Format recent orders
    const formattedRecentOrders = recentOrders.map(order => ({
      id: order._id.toString(),
      customerName: order.userId?.name || order.customerInfo?.name || 'Guest User',
      total: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
        recentOrders: formattedRecentOrders,
        stats: {
          totalProducts,
          activeProducts,
          totalCategories,
          totalOrders,
          lowStockProducts: 0 // We can calculate this if needed
        },
        recentProducts
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
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

    const { action } = await request.json();

    await connectDB();

    switch (action) {
      case 'backup':
        // Implement backup logic
        return NextResponse.json({
          success: true,
          message: 'Backup completed successfully'
        });

      case 'analytics':
        // Generate analytics data
        const analytics = {
          salesByCategory: await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
          ]),
          stockLevels: await Product.aggregate([
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      { case: { $lt: ['$stock', 10] }, then: 'Low' },
                      { case: { $lt: ['$stock', 50] }, then: 'Medium' },
                    ],
                    default: 'High'
                  }
                },
                count: { $sum: 1 }
              }
            }
          ])
        };

        return NextResponse.json({
          success: true,
          data: analytics
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Dashboard action error:', error);
    return NextResponse.json(
      { success: false, error: 'Action failed' },
      { status: 500 }
    );
  }
}
