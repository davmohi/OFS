// 'servicesDTO/eval/stream.js'

export class Stream {
    constructor(iterable) {
        this.iterable = iterable;
    }

    map(f) {
        function* gen(iterable) {
            for (const e of iterable) yield f(e);
        }
        return new Stream(gen(this.iterable));
    }

    filter(f) {
        function* gen(iterable) {
            for (const e of iterable) {
                if (f(e)) yield e;
            }
        }
        return new Stream(gen(this.iterable));
    }

    toList() {
        return [...this.iterable];
    }
}

// Emulating the iterate combinator to return a Stream
export function iterate(init, nextFn) {
    function* generator() {
        let value = init;
        while (true) {
            yield value;
            value = nextFn(value);
        }
    }
    return new Stream(generator());
}
