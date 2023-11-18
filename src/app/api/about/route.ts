// api/route.ts
import { NextResponse } from 'next/server';
import  { readAbout }  from '../../services/about/crud';

//Returns the information of the about section
export const GET = async () => {
  try {
    
    const aboutData = await readAbout();

    return NextResponse.json(aboutData, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
};