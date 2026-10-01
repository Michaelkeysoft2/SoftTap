function getAdminSecret() {
  return (
    process.env.ADMIN_JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.VTPASS_SECRET_KEY ||
    'softtap_default_admin_secret_key_2026_fallback'
  );
}

function base64UrlEncode(str) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64url');
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlEncodeBuffer(buf) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(buf).toString('base64url');
  }
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf8');
  }
  return decodeURIComponent(escape(atob(base64)));
}

function base64UrlDecodeBuffer(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64');
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Signs an admin session token (JWT HMAC-SHA256)
 */
export async function signAdminToken(user) {
  const secret = getAdminSecret();
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    userId: (user._id || user.id).toString(),
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours validity
  };

  const data = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const encodedSignature = base64UrlEncodeBuffer(new Uint8Array(sig));

  return `${data}.${encodedSignature}`;
}

/**
 * Verifies an admin session token (JWT HMAC-SHA256)
 */
export async function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const secret = getAdminSecret();
    const data = `${parts[0]}.${parts[1]}`;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signatureBytes = base64UrlDecodeBuffer(parts[2]);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      enc.encode(data)
    );

    if (!isValid) return null;

    const payload = JSON.parse(base64UrlDecode(parts[1]));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    if (payload.role !== 'admin') {
      return null; // Not an admin
    }

    return payload;
  } catch {
    return null;
  }
}
