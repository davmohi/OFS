// api/keywords/route.ts
import { NextResponse } from 'next/server';
import {readKeywords} from '../../services/keywords/crud';

//Returns a list of reserved words
export const GET = async (req : Request) => {
  try {
    
    const aboutData = await readKeywords();

    return NextResponse.json(aboutData, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
};