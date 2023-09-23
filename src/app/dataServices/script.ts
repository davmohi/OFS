import { promises as fs } from 'fs';
import { join } from 'path';

const filesDirectory = join(process.cwd(), 'codigos');

export async function write(id: string, content: string) {
  const filePath = join(filesDirectory, id);
  await fs.writeFile(filePath, content, 'utf8');
}

export async function read(id: string) {
  const filePath = join(filesDirectory, id);
  const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
  if (!fileExists) {
    throw new Error('Archivo no encontrado');
  }
  return await fs.readFile(filePath, 'utf8');
}

export async function rename(oldId: string, newId: string) {
    const oldFilePath = join(filesDirectory, oldId);
    const newFilePath = join(filesDirectory, newId);
  
    const fileExists = await fs.access(oldFilePath).then(() => true).catch(() => false);
    if (!fileExists) {
      throw new Error('Archivo no encontrado');
    }
  
    await fs.rename(oldFilePath, newFilePath);
  }