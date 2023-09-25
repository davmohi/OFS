// api/keywords/route.ts
import { NextResponse } from 'next/server';
import { readKeywords } from '../../dataServices/keywords';

export const GET = async (req: Request) => {
  try {
    const data = await readKeywords();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}