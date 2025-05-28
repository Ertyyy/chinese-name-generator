import { NextResponse } from 'next/server';
import { generateChineseNames } from '@/lib/deepseek';

console.log("线上API KEY是否有：", process.env.DEEPSEEK_API_KEY ? "有" : "没有");

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const names = await generateChineseNames(name, description);
    return NextResponse.json(names);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate names' },
      { status: 500 }
    );
  }
} 
