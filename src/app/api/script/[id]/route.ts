// script/[id]/route.ts
import { NextResponse } from 'next/server';
import { write, read,rename } from '../../../dataServices/script'; // Asegúrate de ajustar la ruta de importación correctamente

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const requestData = await req.json();
    const { content } = requestData;
    
    if (!id || !content) {
      return NextResponse.json({ message: "ID y contenido son requeridos" }, { status: 400 });
    }

    await write(id, content);

    return NextResponse.json({ message: "Archivo creado/actualizado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ message: "ID es requerido" }, { status: 400 });
    }

    const content = await read(id);
    
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
