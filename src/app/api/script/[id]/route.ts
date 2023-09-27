// script/[id]/route.ts
import { NextResponse } from 'next/server';
import { write, read,rename } from '../../../dataServices/script'; // Asegúrate de ajustar la ruta de importación correctamente

//Returns a script by its name
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const requestData = await req.json();
    const { content } = requestData;
    

    return !id || !content
    ?NextResponse.json({ message: "ID y contenido son requeridos" }, { status: 400 })
    :( await write(id, content),
    NextResponse.json({ message: "Script creado/actualizado con éxito" }, { status: 200 }))

  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}


//Receives a script and an id and sends the script to be saved with this id
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const content = await read(id);
    
    return NextResponse.json({ content }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
