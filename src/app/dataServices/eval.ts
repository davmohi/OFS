import { promises as fs } from 'fs';
import { join } from 'path';

const filesDirectory = join(process.cwd(), 'public');

export async function evalData() {
    const filePath = join(filesDirectory, 'dummy_eval')
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!fileExists) {
        throw new Error('Archivo no encontrado');
    }
    return await fs.readFile(filePath, 'utf8');
}