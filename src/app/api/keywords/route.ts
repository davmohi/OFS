// api/keywords/route.ts
import { NextResponse } from 'next/server';
import * as aboutData from '../../dataServices/keywords.json';

//Returns a list of reserved words
export const GET = async (req: Request) => {
  try {
    return NextResponse.json(aboutData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
};