import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { userId, firstName, lastName, phone, gender, currentPassword, newPassword, action } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Action: Change Password
    if (action === 'change_password') {
      if (!currentPassword || !newPassword) {
        return NextResponse.json({ success: false, message: 'Current and new password are required' }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Incorrect current password' }, { status: 400 });
      }

      if (newPassword.length < 6) {
        return NextResponse.json({ success: false, message: 'New password must be at least 6 characters' }, { status: 400 });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return NextResponse.json({ success: true, message: 'Password updated successfully' });
    }

    // Action: Update Profile Details
    if (action === 'update_profile') {
      if (!firstName || !lastName || !phone) {
        return NextResponse.json({ success: false, message: 'First name, last name and phone are required' }, { status: 400 });
      }

      // Check if phone number is already taken by another user
      const existingPhone = await User.findOne({ phone, _id: { $ne: userId } });
      if (existingPhone) {
        return NextResponse.json({ success: false, message: 'Phone number is already taken' }, { status: 400 });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      if (gender) user.gender = gender;

      await user.save();

      const userObj = {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        walletBalance: user.walletBalance,
        role: user.role,
        referralCode: user.referralCode,
      };

      return NextResponse.json({
        success: true,
        user: userObj,
        message: 'Profile details updated successfully',
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid action specified' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
