// 'services/eval/crud.ts'
import fs from 'fs/promises';
import { join } from 'path';
import vm from 'vm';
const scriptsDirectory = join(process.cwd(), 'scripts.js');

export const evalData = async (fileName: string) => {
    const scriptPath = join(scriptsDirectory, fileName);

    try {
        await fs.access(scriptPath);

        // Read the target script's content
        const scriptContent = await fs.readFile(scriptPath, 'utf8');
        class Stream<T> {
            private iterable: Iterable<T>;
        
            constructor(iterable: Iterable<T>) {
                this.iterable = iterable;
            }
        
            map<U>(f: (value: T) => U): Stream<U> {
                function* gen(iterable: Iterable<T>): Iterable<U> {
                    for (const e of iterable) yield f(e);
                }
                return new Stream(gen(this.iterable));
            }
        
            filter(f: (value: T) => boolean): Stream<T> {
                function* gen(iterable: Iterable<T>): Iterable<T> {
                    for (const e of iterable) {
                        if (f(e)) yield e;
                    }
                }
                return new Stream(gen(this.iterable));
            }
        
            toList(): T[] {
                return [...this.iterable];
            }
        }
        // Define your context
        const loggedValues: any[] = [];
        
        const context: { [key: string]: any } = {
            console: {
                log: (...args: any[]) => {
                    loggedValues.push(...args);
                }
            },
            Stream: Stream,
            iterate: function<T>(init: T, nextFn: (value: T) => T): Stream<T> {
                function* generator(): Iterable<T> {
                    let value = init;
                    while (true) {
                        yield value;
                        value = nextFn(value);
                    }
                }
                return new Stream(generator());
            }
        };
        const script = new vm.Script(scriptContent);
        const sandbox = vm.createContext(context);  // Create a context for the script

        script.runInNewContext(sandbox);  // This will execute the script in the context

        return loggedValues;  // Return the values that were logged
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            throw new Error('Archivo no encontrado');
        }
        return String(error);
    }
}