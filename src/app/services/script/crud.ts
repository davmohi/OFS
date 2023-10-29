import { promises as fs } from 'fs';
import { join } from 'path';
import prisma from "../../../libs/client"
const filesDirectory = join(process.cwd(), 'scripts');

//Saves the script with the Id

export const createScript = async (name: string, body: string) => {
  const existingScript = await prisma.script.findUnique({
    where: { name },
  });

  if (existingScript) {
    // Si el script ya existe, actualízalo
    const updatedScript = await prisma.script.update({
      where: { name },
      data: { body },
    });
    return updatedScript;
  } else {
    // Si el script no existe, créalo
    const newScript = await prisma.script.create({
      data: {
        name,
        body,
      },
    });
    return newScript;
  }
};




/*export const createScript = async (name: string, body: string) => {
  const script = await prisma.script.create({
      data: {
          name,
          body
      }
  });
  return script; // Cambié "createScript" por "script" en el retorno
}*/


//Retrieves and returns a script by its id

export const read = async (name: string) => {
  const existingScript = await prisma.script.findUnique({
    where: { name },
  });

  if (existingScript) {
    // Si el documento existe, lo devolvemos
    return existingScript.body;
  } else {
    // Si el documento no existe, lanzamos un error personalizado
    throw new Error("El documento no se encontró en la base de datos.");
  }
}



/*export const read = async(id: string) =>{
  
  const filePath = join(filesDirectory, id);
  const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
  if (!fileExists) {
    throw new Error('Archivo no encontrado');
  }
  return await fs.readFile(filePath, 'utf8');
}*/

//Renames a script
export const rename = async (oldName: string, newName: string) => {
  const existingScript = await prisma.script.findUnique({
    where: { name: oldName },
  });

  if (!existingScript) {
    throw new Error("El documento con el nombre original no se encontró en la base de datos.");
  }

  const scriptWithNewName = await prisma.script.findUnique({
    where: { name: newName },
  });

  if (scriptWithNewName) {
    // Maneja el conflicto de nombres según tus requisitos, por ejemplo, lanzando un error.
    throw new Error("El nuevo nombre ya está en uso en la base de datos.");
  }

  // Actualiza el nombre del documento existente
  const updatedScript = await prisma.script.update({
    where: { name: oldName },
    data: { name: newName },
  });

  return updatedScript;
};


/*export const rename = async(oldId: string, newId: string) =>{
    const oldFilePath = join(filesDirectory, oldId);
    const newFilePath = join(filesDirectory, newId);
  
    const fileExists = await fs.access(oldFilePath).then(() => true).catch(() => false);
    return fileExists
    ? await fs.rename(oldFilePath, newFilePath)
    : Promise.reject('Archivo no encontrado');
  }*/