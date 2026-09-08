import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

export async function GET(req) {
  try {
    await connectToDatabase();

    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(100);

    const totalTransactions = await Transaction.countDocuments();
    const successfulTx = await Transaction.find({ status: 'success' });

    let totalVolume = 0;
    let totalCost = 0;
    let totalProfit = 0;

    const breakdown = {
      data: { count: 0, volume: 0, profit: 0 },
      airtime: { count: 0, volume: 0, profit: 0 },
      tv: { count: 0, volume: 0, profit: 0 },
      electricity: { count: 0, volume: 0, profit: 0 },
      exam_pin: { count: 0, volume: 0, profit: 0 },
      wallet_funding: { count: 0, volume: 0, profit: 0 },
    };

    successfulTx.forEach((tx) => {
      const amt = tx.amount || 0;
      let cost = tx.costPrice || (amt * 0.92);
      let prof = tx.profit || (amt - cost);

      totalVolume += amt;
      totalCost += cost;
      totalProfit += prof;

      const typeKey = tx.type in breakdown ? tx.type : 'data';
      breakdown[typeKey].count += 1;
      breakdown[typeKey].volume += amt;
      breakdown[typeKey].profit += prof;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: users.length,
        totalTransactions,
        totalVolume,
        totalCost,
        totalProfit,
        marginPercent: totalVolume > 0 ? ((totalProfit / totalVolume) * 100).toFixed(1) : '0',
      },
      breakdown,
      recentTransactions: transactions,
      users,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
