// compile/route.ts
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const requestData = await req.json()
    //extract just value fron json
    const value = requestData.content
    const timestamp = new Date().toISOString()
    //join the data with the timestamp

    const responseData = ''+value+'\n'+timestamp
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}