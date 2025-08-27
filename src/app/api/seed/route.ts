import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed-database';

export async function POST(request: NextRequest) {
  try {
    // In production, you might want to add authentication here
    // to prevent unauthorized database seeding
    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json(
        { message: 'Database seeded successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Seeding API error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: 'Database seeding endpoint',
      note: 'Use POST method to seed the database'
    },
    { status: 200 }
  );
}
