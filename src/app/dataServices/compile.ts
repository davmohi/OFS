// dataServices/compile.ts

import { writeFile } from 'fs/promises';
import { join } from 'path';

export const compileData = async (content: string, id: string) => {
  const timestamp = new Date().toISOString();
  
  const filename = `${id}.js`; // Crear el nombre del archivo
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
