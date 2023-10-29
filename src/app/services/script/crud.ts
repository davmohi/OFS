import { promises as fs } from 'fs';
import { join } from 'path';
import prisma from "../../../libs/client"
const filesDirectory = join(process.cwd(), 'scripts');

//Saves the script with the Id
export const createScript = async (name: string, body: string) => {
  const script = await prisma.script.create({
      data: {
          name,
          body
      }
  });
  return script; // Cambié "createScript" por "script" en el retorno
}


//Retrieves and returns a script by its id
export const read = async(id: string) =>{
  
  const filePath = join(filesDirectory, id);
  const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
  if (!fileExists) {
    throw new Error('Archivo no encontrado');
  }
  return await fs.readFile(filePath, 'utf8');
}

//Renames a script
export const rename = async(oldId: string, newId: string) =>{
    const oldFilePath = join(filesDirectory, oldId);
    const newFilePath = join(filesDirectory, newId);
  
    const fileExists = await fs.access(oldFilePath).then(() => true).catch(() => false);
    return fileExists
    ? await fs.rename(oldFilePath, newFilePath)
    : Promise.reject('Archivo no encontrado');
  }