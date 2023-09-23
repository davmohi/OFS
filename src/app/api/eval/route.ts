// eval/route.ts
import { NextResponse } from 'next/server';
import { evalData } from '../../dataServices/eval'; 

export async function POST(req: Request) {
    try{
        const data = await evalData();
        return NextResponse.json(data, {status: 200})
    }
    catch (error) {
        return NextResponse.json({ message: "Error", error }.error, {status: 500})
    }
}