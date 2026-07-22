import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

export async function GET(req) {
  try {
    await connectToDatabase();
    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    const totalTransactions = await Transaction.countDocuments();
    const successfulTx = await Transaction.find({ status: 'success' });
    const totalVolume = successfulTx.reduce((sum, tx) => sum + (tx.amount || 0), 0);

    return NextResponse.json({
      success: true,
      users,
      stats: {
        totalUsers: users.length,
        totalTransactions,
        totalVolume,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { targetUserId, action, amount } = await req.json();

    if (!targetUserId || !amount || !action) {
      return NextResponse.json({ success: false, message: 'Invalid params' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(targetUserId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const previousBalance = user.walletBalance;
    const changeAmount = parseFloat(amount);
    const newBalance = action === 'credit' ? previousBalance + changeAmount : previousBalance - changeAmount;

    user.walletBalance = Math.max(0, newBalance);
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: 'wallet_funding',
      reference: `ST_ADM_${Date.now()}`,
      serviceName: `Admin ${action === 'credit' ? 'Manual Credit' : 'Manual Debit'}`,
      networkOrProvider: 'Admin Panel',
      recipient: user.phone,
      amount: changeAmount,
      previousBalance,
      newBalance: user.walletBalance,
      status: 'success',
      details: { performedBy: 'Admin' },
    });

    return NextResponse.json({
      success: true,
      newBalance: user.walletBalance,
      message: `User wallet successfully ${action === 'credit' ? 'credited' : 'debited'} with ₦${changeAmount.toLocaleString()}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
