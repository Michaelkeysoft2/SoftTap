import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * Check if admin setup is enabled
 */
export async function GET() {
  const isConfigured = Boolean(process.env.ADMIN_SETUP_SECRET && process.env.ADMIN_SETUP_SECRET.trim().length > 0);
  return NextResponse.json({
    setupEnabled: isConfigured,
    message: isConfigured 
      ? 'Admin setup is available. Submit POST with setupSecret, email, and password.'
      : 'Admin setup is currently disabled. Set ADMIN_SETUP_SECRET in environment variables to enable.',
  });
}

/**
 * Create or promote the first admin account
 */
export async function POST(req) {
  try {
    const serverSecret = process.env.ADMIN_SETUP_SECRET;

    if (!serverSecret || serverSecret.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Admin setup is disabled because ADMIN_SETUP_SECRET is not configured in environment variables.' 
        },
        { status: 403 }
      );
    }

    const { setupSecret, email, password, firstName, lastName, phone } = await req.json();

    if (!setupSecret || setupSecret !== serverSecret) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin setup secret' },
        { status: 401 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      // Promote existing user to admin
      existingUser.role = 'admin';
      existingUser.password = await bcrypt.hash(password, 10);
      if (firstName) existingUser.firstName = firstName;
      if (lastName) existingUser.lastName = lastName;
      if (phone) existingUser.phone = phone;
      await existingUser.save();

      return NextResponse.json({
        success: true,
        message: `User ${normalizedEmail} has been successfully promoted to Admin!`,
        admin: {
          id: existingUser._id.toString(),
          email: existingUser.email,
          role: existingUser.role,
        },
      });
    }

    // Create new admin account
    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = `ADM${Math.floor(100000 + Math.random() * 900000)}`;

    const newAdmin = await User.create({
      firstName: firstName || 'Super',
      lastName: lastName || 'Admin',
      email: normalizedEmail,
      phone: phone || `080${Math.floor(10000000 + Math.random() * 90000000)}`,
      password: hashedPassword,
      gender: 'other',
      role: 'admin',
      referralCode,
      walletBalance: 0,
      isVerified: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Admin account for ${normalizedEmail} was created successfully!`,
        admin: {
          id: newAdmin._id.toString(),
          email: newAdmin.email,
          role: newAdmin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error creating admin account' },
      { status: 500 }
    );
  }
}
