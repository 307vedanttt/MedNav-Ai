import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

// Helper to determine specialty (mimicking AI backend logic)
function determineSpecialty(text) {
  const lowercaseInput = text.toLowerCase();
  if (lowercaseInput.includes("heart") || lowercaseInput.includes("chest") || lowercaseInput.includes("breath") || lowercaseInput.includes("palpitation")) return "Cardiology";
  if (lowercaseInput.includes("stomach") || lowercaseInput.includes("belly") || lowercaseInput.includes("digest")) return "Gastroenterology";
  if (lowercaseInput.includes("head") || lowercaseInput.includes("dizzy") || lowercaseInput.includes("migraine") || lowercaseInput.includes("faint")) return "Neurology";
  if (lowercaseInput.includes("bone") || lowercaseInput.includes("joint") || lowercaseInput.includes("fracture") || lowercaseInput.includes("break") || lowercaseInput.includes("arm") || lowercaseInput.includes("leg")) return "Orthopedics";
  return "General";
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('medai_user_id')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { symptom } = await request.json();

    if (!symptom) {
      return NextResponse.json({ error: 'Symptom text is required' }, { status: 400 });
    }

    const specialty = determineSpecialty(symptom);
    const severity = specialty !== "General" ? "High" : "Moderate";

    const historyEntry = await prisma.symptomHistory.create({
      data: {
        userId,
        symptom,
        specialty,
        severity,
      },
    });

    return NextResponse.json({ 
      success: true, 
      analysis: {
        specialty,
        severity,
        entry: historyEntry
      }
    });
  } catch (error) {
    console.error('Symptoms API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('medai_user_id')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const history = await prisma.symptomHistory.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error('History API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('medai_user_id')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.symptomHistory.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Clear History API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
