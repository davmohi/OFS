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
// script/[id]/route.ts
import { NextResponse } from 'next/server';
import { saveScript, readScript, renameScript } from '../../../services/script/crud';

//Returns a script by its name
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const requestData = await req.json();
    const { content } = requestData;
    

    return !id || !content
    ?NextResponse.json({ message: "ID y contenido son requeridos" }, { status: 400 })
    :( await saveScript(id, content),
    NextResponse.json({ message: "Script creado/actualizado con éxito" }, { status: 200 }))

  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}


//Receives a script and an id and sends the script to be saved with this id
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const content = await readScript(id);
    
    return NextResponse.json({ content }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
