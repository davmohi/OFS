
import { NextResponse } from 'next/server';
import { rename } from '../../dataServices/script'; 


//Allows the renaming of a script
export const PUT = async (req: Request) => {
  try {
    const requestData = await req.json();
    const {id,newId} = requestData;
    
    return !id || !newId
    ?NextResponse.json({ message: "ID y nuevo ID son requeridos" }, { status: 400 })
    :(await rename(id, newId),
    NextResponse.json({ message: "Script ID cambiado con éxito" }, { status: 200 }));

    
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
