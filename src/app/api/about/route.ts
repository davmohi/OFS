// api/route.ts
import { NextResponse } from 'next/server';
import * as aboutData from '../../dataServices/about.json';

//Returns the information of the about section
export const GET = async (req: Request) => {
  try {
    return NextResponse.json(aboutData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
};
