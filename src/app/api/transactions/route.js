import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    const user = await User.findById(userId).select('walletBalance firstName lastName email phone role');

    return NextResponse.json({
      success: true,
      walletBalance: user ? user.walletBalance : 0,
      user,
      transactions,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
