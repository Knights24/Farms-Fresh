import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import connectDB from './mongodb';
import { User } from './models';

const JWT_SECRET = process.env.JWT_SECRET || 'farmsfresh-secret-key';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    await connectDB();
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'No token provided', status: 401 };
  }

  const token = authHeader.substring(7);
  const user = await verifyToken(token);
  
  if (!user) {
    return { error: 'Invalid token', status: 401 };
  }

  return { user };
}

export async function requireAdminAuth(request: NextRequest) {
  const authResult = await requireAuth(request);
  
  if ('error' in authResult) {
    return authResult;
  }

  if (authResult.user.role !== 'admin') {
    return { error: 'Admin access required', status: 403 };
  }

  return authResult;
}

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '24h' });
}
