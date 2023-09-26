import { promises as fs } from 'fs';
import { join } from 'path';

const filesDirectory = join(process.cwd(), 'scripts');

export const write = async(id: string, content: string) => {
  const filePath = join(filesDirectory, id);
  await fs.writeFile(filePath, content, 'utf8');
}

export const read = async(id: string) =>{
  
  const filePath = join(filesDirectory, id);
  const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
  if (!fileExists) {
    throw new Error('Archivo no encontrado');
  }
  return await fs.readFile(filePath, 'utf8');
}

export const rename = async(oldId: string, newId: string) =>{
    const oldFilePath = join(filesDirectory, oldId);
    const newFilePath = join(filesDirectory, newId);
  
    const fileExists = await fs.access(oldFilePath).then(() => true).catch(() => false);
    return fileExists
    ? await fs.rename(oldFilePath, newFilePath)
    : Promise.reject('Archivo no encontrado');
  }