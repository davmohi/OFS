// dataServices/compile.ts

import { writeFile } from 'fs/promises';
import { join } from 'path';


//"Compiles" the code (for the moment it only returns the same code with the date and saves the compiled code in a .js).
export const compileData = async (content: string, id: string) => {
  const timestamp = new Date().toISOString();
  
  const filename = `${id}.js`; // Sets the name of the script
  const filePath = join(__dirname, '../../../../../scripts.js', filename);
  
  try {
    await writeFile(filePath, content, 'utf-8');
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }
  
  return {
    content: `${timestamp}\n${content}`,
    filename, // Incluir el nombre del archivo en la respuesta
  };
};
