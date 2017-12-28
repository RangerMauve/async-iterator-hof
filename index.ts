
class AsyncIteraterHof<T> implements AsyncIterable<T> {
	private source: AsyncIterable<T>

	constructor(source: AsyncIterable<T>) {
		this.source = source;
	}

	concat(...args: AsyncIterable<T>[]) : AsyncIterable<T> {
		async function* operation() : AsyncIterableIterator<T> {	
			for(let list of args) {
				yield* list;
			}
		}

		return new AsyncIteraterHof<T>(operation());
	}

	async includes(value: T) : Promise<boolean> {
		for await(let item of this.source) {
			if(item === value) return true;
		}
		return false;
	}

	async every(fn: (T) => boolean) {
		for await(let item of this.source) {
			if(!fn(item)) return false;
		}
		return true;
	}

	async* filter(fn: (T) => boolean) : AsyncIterable<T> {
		for await(let item of this.source) {
			if(fn(item))
				yield item;
		}
	}

	async find(fn: (T) => boolean) : Promise<T | undefined> {
		for await(let item of this.source) {
			if(fn(item))
				return item;
		}
	}

	async findIndex(fn: (T) => boolean) : Promise<number> {
		let index = -1;
		for await (let item of this.source) {
			index++;
			if (fn(item))
				return index;
		}
		return -1;
	}

	async* flatten() : AsyncIterable<T> {
		for await(let item of this.source) {
			// TODO: Figure out if this is a dirty hack
			// @ts-ignore
			yield* item;
		}
	}

	async forEach(fn: (T) => void) : Promise<void> {
		for await(let item of this.source) {
			fn(item);
		}
	}

	async join(separater=",") : Promise<string> {
		let result = "";
		let first = true;
		for await (let item of this.source) {
			result += item;
			if(!first) {
				result += separater;
			} else {
				first = false;
			}
		}
		return result;
	}

	async indexOf(value: T) : Promise<number> {
		return this.findIndex((item: T) => item === value);
	}

	async* map<R>(fn: (T) => R) : AsyncIterable<R> {
		for await (let item of this.source) {
			return fn(item);
		}
	}

	async reduce<R>(fn: (R, T) => R, initial?) : Promise<R> {
		let result = initial;
		let hadInitial = (initial !== undefined);
		for await (let item of this.source) {
			if(!hadInitial) {
				result = item;
				hadInitial = false;
			} else {
				result = fn(result, item);
			}
		}
		return result;
	}

	async* scan<R>(fn: (R, T) => R, initial?): AsyncIterable<R> {
		let result = initial;
		let hadInitial = (initial !== undefined);
		for await (let item of this.source) {
			if (!hadInitial) {
				result = item;
				hadInitial = false;
			} else {
				result = fn(result, item);
				yield result;
			}
		}
		return result;
	}

	async* slice(start) {
		// TODO
	}

	async some(fn: (T) => boolean) : Promise<boolean> {
		for await (let item of this.source) {
			if(fn(item))
				return true;
		}

		return false;
	}

	tee(n: number) : AsyncIterable<T>[] {
		// TODO
		return [];
	}

	async* zip<R>(other: AsyncIterable<R>) : AsyncIterable<[T, R]> {

	}

	[Symbol.asyncIterator]() : AsyncIterator<T> {
		return this.source[Symbol.asyncIterator]();
	}
}