// 'servicesDTO/eval/stream.ts'
export class Stream<T> {
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

// Emulando el combinador iterate de OFS para que devuelva un Stream
export function iterate<T>(init: T, nextFn: (value: T) => T): Stream<T> {
    function* generator(): Iterable<T> {
        let value = init;
        while (true) {
            yield value;
            value = nextFn(value);
        }
    }
    return new Stream(generator());
}
