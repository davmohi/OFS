// compile/route.ts
import { NextResponse } from 'next/server';
import { compileData } from '../../services/compile/crud'; 


//Receives the scrip, sends it to be compiled and the result is returned
export const POST = async (req: Request) => {
  try {
    const requestData = await req.json();
    const value = requestData.content;
    const id = requestData.id;
    
    const responseData = await compileData(value, id);
    
    // Incluir content y filename en la respuesta
    return NextResponse.json({ content: responseData.content, filename: responseData.filename }, { status: 200 });
  } catch (error) {
    console.error('Error en la compilación:', error);
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: "Error", error:errorMessage }, { status: 500 });
  }
}
