// eval/route.ts
import { NextResponse } from 'next/server';
import { evalData } from '../../dataServices/eval'; 

//Receives the scrip, sends it to be evaluated and the result is returned
export const POST = async(req: Request)=> {
    try{
        const data = await evalData();
        return NextResponse.json(data, {status: 200})
    }
    catch (error) {
        return NextResponse.json({ message: "Error", error }.error, {status: 500})
    }
}