/* 
University: Universidad Nacional
School: Escuela de Informatica
Course: Paradigmas de Programación EIF 400
Semester: 2 Year: 2023
Team 02-1pm 
Members:
Luis Lopez Castro id: 402420889
Anderson Mora Aguero id: 115600170
David Morales Hidalgo id: 116300616
Alberto Aguero Herdocia id: 118450651
Project: OneFlowStream (OFS)
*/
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