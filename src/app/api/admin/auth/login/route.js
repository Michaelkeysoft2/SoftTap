import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signAdminToken } from '@/lib/admin-auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email and password' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Strictly enforce role="admin"
    if (user.role !== 'admin') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Access denied: This portal is strictly reserved for administrators.' 
        },
        { status: 403 }
      );
    }

    // Generate signed admin session token
    const token = await signAdminToken(user);

    const adminData = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful',
      admin: adminData,
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: 'softtap_admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error during admin login' },
      { status: 500 }
    );
  }
}
