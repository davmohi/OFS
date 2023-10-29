// 'utils/eval/stream.ts'
export function getStream() {
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
        
        cut(n: number): Stream<T>{
            function* gen(iterable: Iterable<T>): Iterable<T> {
                let count = 0;
                for (const e of iterable) {
                    if(count < n){
                        yield e;
                        count++;
                    }
                    else{break;}
                }
            }
            return new Stream(gen(this.iterable));
        }
        toList(): T[] {
            const results: T[] = [];
            for (const value of this.iterable) {
                results.push(value);
            }
            return results;
        }
    }
    
    function iterate<T>(init: T, nextFn: (value: T) => T, limit: number=10000): Stream<T> {
        function* generator(): Iterable<T> {
            let value = init;
            let count = 0;
            while (count < limit) {
                yield value;
                value = nextFn(value);
                count++;
            }
        }
        return new Stream(generator());
    }
    return {
        Stream: Stream,
        iterate: iterate
    }
}
