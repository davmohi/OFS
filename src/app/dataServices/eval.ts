import { promises as fs } from 'fs';
import { join } from 'path';

const filesDirectory = join(process.cwd(), 'public');


//"Evaluates" the code (for it only returns a dummy script).
export const evalData = async()=> {
    const filePath = join(filesDirectory, 'dummy_eval.txt')
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    return fileExists ? await fs.readFile(filePath, 'utf8') : Promise.reject('Archivo no encontrado');
}