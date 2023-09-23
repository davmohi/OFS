// api/route.ts
import { NextResponse } from 'next/server';
import { readData } from '../../dataServices/about'; // Asegúrate de ajustar la ruta de importación correctamente

export const GET = async (req: Request) => {
  try {
    const data = await readData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }.error, { status: 500 });
  }
}
