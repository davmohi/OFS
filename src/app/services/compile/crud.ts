// dataServices/compile.ts

import { writeFile, readdir, unlink } from 'fs/promises';
import { join } from 'path';

//"Compiles" the code (for the moment it only returns the same code with the date and saves the compiled code in a .js).
export const compileData = async (content: string, id: string) => {
  
  const filename = `${id.split(".")[0]}.js`; // Sets the name of the script
  const filePath = join(__dirname, '../../../../../scripts.js', filename);
  // agregar delete de todo dentro de script.js
  const clearScriptsDirectory = async (directoryPath: string) => {
    const files = await readdir(directoryPath);
  
    // Promise all will execute all unlink operations at once
    await Promise.all(files.map(file => unlink(join(directoryPath, file))));
  };
  await clearScriptsDirectory(join(__dirname, '../../../../../scripts.js'));
  try {
    await writeFile(filePath, content, 'utf-8');
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }

  // Fetch the script content from the SWI-Prolog server
  const serverURL = `http://localhost:8000/retrieve?filename=${filename}`;
  let serverContent: String = ''
  try {
    const response = await fetch(serverURL);
    if (response.ok) {
      const data = await response.json();
      serverContent  = data.content;
    } else {
      console.error('Error fetching from SWI-Prolog server:', await response.text());
    }
  } catch (error) {
    console.error('Fetch error:', error);
    serverContent  = 'Error al cargar desde Prolog';
  }
  
  return {
    content: serverContent,
    filename, // includes the filename in the response
  };
};
