// eval/route.ts
import { NextResponse } from 'next/server';
import { evalData } from '../../services/eval/crud'; 

//Receives the scrip, sends it to be evaluated and the result is returned
export const POST = async(req: Request)=> {
    try{
        const requestData = await req.json();
        const fileName = requestData.fileName;
        const data = await evalData(fileName);
        return NextResponse.json(data, {status: 200})
    }
    catch (error) {
        return NextResponse.json({ message: "Error", error }.error, {status: 500})
    }
}