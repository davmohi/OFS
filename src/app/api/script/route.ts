import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { parse as parseUrl } from 'url';

const filesDirectory = join(process.cwd(), 'codigos');

export const POST = async (req: Request) => {
  try {
    const requestData = await req.json();
    const { id, content } = requestData;
    if (!id || !content) {
      return NextResponse.json({ message: "ID y contenido son requeridos" }, { status: 400 });
    }
    const filePath = join(filesDirectory, id);
    await fs.writeFile(filePath, content, 'utf8');

    return NextResponse.json({ message: "Archivo creado/actualizado con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export const GET = async (req: Request) => {
  try {
    const parsedUrl = parseUrl(req.url || '', true);
    const { id } = parsedUrl.query;

    if (!id) {
      return NextResponse.json({ message: "ID es requerido" }, { status: 400 });
    }

    const filePath = join(filesDirectory, id as string);
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

    if (!fileExists) {
      return NextResponse.json({ message: "Archivo no encontrado" }, { status: 404 });
    }

    const content = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}