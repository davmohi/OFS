// api/route.ts
import { NextResponse } from 'next/server';
import  { AboutService }  from '../../services/about/crud';

//Returns the information of the about section
export const GET = async (req: Request) => {
  try {
    const aboutService = new AboutService();
    const aboutData = aboutService.getAboutData();
    return NextResponse.json(aboutData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
};