import { NextRequest, NextResponse } from 'next/server';
import {prisma}  from '@/lib/prisma';

// Hardcoded user ID for MVP (replace with dynamic user ID from Prisma Studio)
const DEMO_USER_ID = 'ad4b09bb-38f4-4022-9371-9d67c57dee9f';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, moodRating, sleepHours, weather, activities } = body;

    // Validation
    if (!date || !moodRating) {
      return NextResponse.json(
        { error: 'Date and mood rating are required' },
        { status: 400 }
      );
    }

    if (moodRating < 1 || moodRating > 5) {
      return NextResponse.json(
        { error: 'Mood rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create entry
    const entry = await prisma.entry.create({
      data: {
        userId: DEMO_USER_ID,
        date: new Date(date),
        moodRating,
        sleepHours: sleepHours || null,
        weather: weather || null,
        activities: activities || [],
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Error creating entry:', error);
    
    // Handle unique constraint violation (duplicate date)
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An entry for this date already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const entries = await prisma.entry.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}