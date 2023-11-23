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
// api/keywords/route.ts
import { NextResponse } from 'next/server';
import {readKeywords} from '../../services/keywords/crud';

//Returns a list of reserved words
export const GET = async (req : Request) => {
  try {
    
    const aboutData = await readKeywords();

    return NextResponse.json(aboutData, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
};