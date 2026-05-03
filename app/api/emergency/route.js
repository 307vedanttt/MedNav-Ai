import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { hospitalId, lat, lon } = await request.json();

    if (!hospitalId || lat === undefined || lon === undefined) {
      return NextResponse.json({ error: 'hospitalId, lat, and lon required' }, { status: 400 });
    }

    const log = await prisma.emergencyLog.create({
      data: {
        hospitalId: hospitalId.toString(),
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
    });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error('Emergency API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
