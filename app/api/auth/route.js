import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { authId, passkey } = await request.json();

    if (!authId || !passkey) {
      return NextResponse.json({ error: 'Auth ID and passkey required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { authId },
    });

    if (user) {
      if (user.passkey !== passkey) {
        return NextResponse.json({ error: 'Invalid passkey' }, { status: 401 });
      }
    } else {
      user = await prisma.user.create({
        data: { authId, passkey },
      });
    }

    const cookieStore = await cookies();
    cookieStore.set('medai_user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
