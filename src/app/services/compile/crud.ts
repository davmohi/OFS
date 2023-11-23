/* 
University: Universidad Nacional
School: Escuela de Informatica
Course: Paradigmas de Programación EIF 400
Semester: 2 Year: 2023
Team 02-1pm 
Members:
Luis Lopez Castro id: 402420889
Anderson Mora Aguero id: 115600170
David Morales Hidalgo id: 116300616
Alberto Aguero Herdocia id: 118450651
Project: OneFlowStream (OFS)
*/
// dataServices/compile.ts

import { writeFile, readdir, unlink } from 'fs/promises';
import { join } from 'path';

export const compileData = async (content: string, id: string) => {
  const filename = `${id.split(".")[0]}.js`;
  const filePath = join(__dirname, '../../../../../scripts.js', filename);

  const clearScriptsDirectory = async (directoryPath: string) => {
    const files = await readdir(directoryPath);
    await Promise.all(files.map(file => unlink(join(directoryPath, file))));
  };
  await clearScriptsDirectory(join(__dirname, '../../../../../scripts.js'));

  try {
    await writeFile(filePath, content, 'utf-8');

    const serverURL = `http://localhost:8000/retrieve?filename=${filename}`;
    const response = await fetch(serverURL);

    if (!response.ok) {
      console.error('Error en el servidor Prolog:', response.statusText);
      console.log('ccccccccccccccccccccccccccccc',response);

      // Aquí, puedes acceder al mensaje de error específico desde el cuerpo de la respuesta
      const errorResponse = await response.json();
      console.log('AAAAAAAAAAAAAAAA', errorResponse);
      console.error('Detalles del error Prolog:', errorResponse.details);
      throw new Error(errorResponse.error || 'Error en el servidor Prolog');
    }

    const data = await response.json();
    if(data.error){
      throw new Error(data.error);
    }
    return {
      content: data.content,
      filename,
    };
  } catch (error) {
    throw error; // Relanza la excepción para que sea capturada por el bloque catch en el backend
  }
};