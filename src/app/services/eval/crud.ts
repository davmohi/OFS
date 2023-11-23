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
// 'services/eval/crud.ts'
import fs from 'fs/promises';
import { join } from 'path';
import vm from 'vm';
import { getStream } from '../../utils/stream';
const { Stream, iterate } = getStream();
const scriptsDirectory = join(process.cwd(), 'scripts.js');

export const evalData = async (fileName: string) => {
    const scriptPath = join(scriptsDirectory, fileName);

    try {
        await fs.access(scriptPath);

        // Read the target script's content
        let scriptContent = await fs.readFile(scriptPath, 'utf8');

        if (!scriptContent.endsWith(".toList();")){
            const lastIndex = scriptContent.lastIndexOf(';');
            if (lastIndex !== -1) {
                scriptContent = scriptContent.substring(0, lastIndex) + ".toList();" + scriptContent.substring(lastIndex + 1);
            }
        }
        // Define your context
        const loggedValues: any[] = [];
        
        const context: { [key: string]: any } = {
            console: {
                log: (...args: any[]) => {
                    loggedValues.push(args.join(' '));
                }
            },
            Stream: Stream,
            iterate: iterate
        };
        const script = new vm.Script(scriptContent);
        const sandbox = vm.createContext(context);  // Create a context for the script
        
        script.runInNewContext(sandbox);  // This will execute the script in the context

        // If the final value is a Stream, invoke toList
        // if (sandbox._finalValue instanceof Stream) {
        //     sandbox._finalValue.toList();
        // }

        return loggedValues.join('\n');  // Return the values that were logged
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            throw new Error('Archivo no encontrado');
        }
        return String(error);
    }
}