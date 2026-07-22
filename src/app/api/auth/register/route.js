import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone, gender, referral, password } = await req.json();

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json({ success: false, message: 'Please fill in all required fields' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone: phone }],
    });

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User with this email or phone already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = `ST${Math.floor(100000 + Math.random() * 900000)}`;

    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      gender: gender || 'male',
      password: hashedPassword,
      referralCode,
      referredBy: referral || null,
      walletBalance: 0.0,
      role: email.toLowerCase() === 'michaelkeysofy@gmail.com' ? 'admin' : 'user',
    });

    const userObj = {
      id: newUser._id.toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      walletBalance: newUser.walletBalance,
      role: newUser.role,
      referralCode: newUser.referralCode,
    };

    return NextResponse.json({ success: true, user: userObj, message: 'Registration successful' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
