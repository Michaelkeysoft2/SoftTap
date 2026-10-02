import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.valid) {
      return NextResponse.json(
        { success: false, message: auth.error || 'Unauthorized: Admin privileges required' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    const allTransactions = await Transaction.find().sort({ createdAt: -1 });

    const totalTransactions = allTransactions.length;
    const successCount = allTransactions.filter(tx => tx.status === 'success').length;
    const failedCount = allTransactions.filter(tx => tx.status === 'failed').length;
    const pendingCount = allTransactions.filter(tx => tx.status === 'pending').length;

    let totalVolume = 0;
    let totalCost = 0;
    let totalProfit = 0;

    const breakdown = {
      data: { count: 0, volume: 0, cost: 0, profit: 0 },
      airtime: { count: 0, volume: 0, cost: 0, profit: 0 },
      tv: { count: 0, volume: 0, cost: 0, profit: 0 },
      electricity: { count: 0, volume: 0, cost: 0, profit: 0 },
      exam_pin: { count: 0, volume: 0, cost: 0, profit: 0 },
      wallet_funding: { count: 0, volume: 0, cost: 0, profit: 0 },
    };

    // Only aggregate accounting from successful transactions
    allTransactions.filter(tx => tx.status === 'success').forEach((tx) => {
      const amt = tx.amount || 0;
      const cost = tx.costPrice ?? 0;
      const prof = tx.profit ?? 0;

      totalVolume += amt;
      totalCost += cost;
      totalProfit += prof;

      const typeKey = tx.type in breakdown ? tx.type : 'data';
      breakdown[typeKey].count += 1;
      breakdown[typeKey].volume += amt;
      breakdown[typeKey].cost += cost;
      breakdown[typeKey].profit += prof;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: users.length,
        totalTransactions,
        successCount,
        failedCount,
        pendingCount,
        totalVolume,
        totalCost,
        totalProfit,
        marginPercent: totalVolume > 0 ? ((totalProfit / totalVolume) * 100).toFixed(1) : '0',
      },
      breakdown,
      recentTransactions: allTransactions.slice(0, 200),
      users,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
