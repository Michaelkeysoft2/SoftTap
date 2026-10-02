import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.valid) {
      return NextResponse.json(
        { success: false, message: auth.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const user = await User.findById(auth.admin.id).select('-password');
    if (!user) {
      return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      admin: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.valid) {
      return NextResponse.json(
        { success: false, message: auth.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const { firstName, lastName, phone, currentPassword, newPassword } = await req.json();

    await connectToDatabase();
    const user = await User.findById(auth.admin.id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
    }

    // If changing password, verify current password first
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, message: 'Current password is required to set a new password' },
          { status: 400 }
        );
      }
      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: 'New password must be at least 6 characters long' },
          { status: 400 }
        );
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Update details if provided
    if (firstName && firstName.trim()) user.firstName = firstName.trim();
    if (lastName && lastName.trim()) user.lastName = lastName.trim();
    if (phone && phone.trim()) user.phone = phone.trim();

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Admin profile updated successfully',
      admin: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error updating profile' },
      { status: 500 }
    );
  }
}
