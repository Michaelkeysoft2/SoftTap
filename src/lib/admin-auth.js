import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { signAdminToken, verifyAdminToken } from '@/lib/admin-token';

export { signAdminToken, verifyAdminToken };

/**
 * Verifies an incoming Next.js API request for admin privileges.
 * Checks cookie 'softtap_admin_token' or Authorization header 'Bearer <token>'.
 */
export async function verifyAdminRequest(req) {
  let token = null;

  // Check cookies
  if (req.cookies && typeof req.cookies.get === 'function') {
    token = req.cookies.get('softtap_admin_token')?.value;
  }

  // Check Authorization header if no cookie
  if (!token && req.headers && typeof req.headers.get === 'function') {
    const authHeader = req.headers.get('authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) {
    return { valid: false, error: 'Unauthorized: No admin session token provided' };
  }

  const payload = await verifyAdminToken(token);
  if (!payload) {
    return { valid: false, error: 'Unauthorized: Invalid or expired admin token' };
  }

  // Verify against database for defense-in-depth
  try {
    await connectToDatabase();
    const user = await User.findById(payload.userId);
    if (!user || user.role !== 'admin') {
      return { valid: false, error: 'Forbidden: Account is not an active admin' };
    }

    return {
      valid: true,
      admin: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    };
  } catch (err) {
    return { valid: false, error: 'Server error verifying admin account' };
  }
}
