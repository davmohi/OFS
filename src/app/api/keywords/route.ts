// api/keywords/route.ts
import { NextResponse } from 'next/server';
import {KeywordsService} from '../../services/keywords/crud';

//Returns a list of reserved words
export const GET = async (req: Request) => {
  try {
    const keywordsService = new KeywordsService();
    const keywordsData= keywordsService.getKeywordsData();
    return NextResponse.json(keywordsData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
};