import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req) {
  const auth = await verifyAdminRequest(req);

  if (!auth.valid) {
    return NextResponse.json(
      { success: false, message: auth.error || 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    admin: auth.admin,
  });
}
