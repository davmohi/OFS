// compile/route.ts
import { NextResponse } from 'next/server';
import { compileData } from '../../dataServices/compile'; 

export const POST = async (req: Request) => {
  try {
    const requestData = await req.json();
    const value = requestData.content;
    
    const responseData = await compileData(value);
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
