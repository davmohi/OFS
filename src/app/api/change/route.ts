
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
import { NextResponse } from 'next/server';
import { renameScript } from '../../services/script/crud'; 


//Allows the renaming of a script
export const PUT = async (req: Request) => {
  try {
    const requestData = await req.json();
    const {id,newId} = requestData;
    
    return !id || !newId
    ?NextResponse.json({ message: "ID y nuevo ID son requeridos" }, { status: 400 })
    :(await  renameScript(id, newId),
    NextResponse.json({ message: "Script ID cambiado con éxito" }, { status: 200 }));

    
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
