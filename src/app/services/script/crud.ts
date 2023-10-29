import { promises as fs } from 'fs';
import { join } from 'path';
import prisma from "../../../libs/client"
const filesDirectory = join(process.cwd(), 'scripts');

//Saves the script with the Id

export const saveScript = async (name: string, body: string) => {
  const existingScript = await prisma.script.findUnique({
    where: { name },
  });

  if (existingScript) {
    const updatedScript = await prisma.script.update({
      where: { name },
      data: { body },
    });
    return updatedScript;
  } else {
    const newScript = await prisma.script.create({
      data: {
        name,
        body,
      },
    });
    return newScript;
  }
};

//Retrieves and returns a script by its id
export const readScript = async (name: string) => {
  const existingScript = await prisma.script.findUnique({
    where: { name },
  });

  if (existingScript) {
    return existingScript.body;
  } else {
    throw new Error("El documento no se encontró en la base de datos.");
  }
}



//Renames a script
export const renameScript= async (oldName: string, newName: string) => {
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
    throw new Error("El nuevo nombre ya está en uso en la base de datos.");
  }
  const updatedScript = await prisma.script.update({
    where: { name: oldName },
    data: { name: newName },
  });

  return updatedScript;
};