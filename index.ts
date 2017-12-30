
/**
 * Takes AsyncIterables and adds methods you'd expect to have in Arrays.
 * All callbacks passed to methods can be either sync or async
 */
export default class AsyncIteraterHof<T> implements AsyncIterable<T> {
	private source: AsyncIterable<T>

	constructor(source: AsyncIterable<T>) {
		this.source = source;
	}

	/**
	 * Concatonates the current AsyncIterable with others into one big AsyncIterable
	 * @param args List of AsyncIterables to add concatenate with this one
	 */
	concat(...args: AsyncIterable<T>[]) : AsyncIterable<T> {
		async function* operation(source : AsyncIterable<T>) : AsyncIterableIterator<T> {
			yield* source;
			for(let list of args) {
				yield* list;
			}
		}

		return new AsyncIteraterHof<T>(operation(this.source));
	}

	/**
	 * Checks to see if a value exists in the sequence
	 * @param value The value to look for
	 */
	async includes(value: T) : Promise<boolean> {
		for await(let item of this.source) {
			if(item === value) return true;
		}
		return false;
	}

	/**
	 * Check if every item in the sequence meets a given condition
	 * @param fn callback that tests whether the item meets a certain condition
	 * @param thisArg Optional `this` context to use in the callback
	 */
	async every(fn: (item: T, index?: number) => boolean, thisArg?) {
		let index = 0;
		for await(let item of this.source) {
			if (!(await fn.call(thisArg, item, index))) return false;
			index++;
		}
		return true;
	}

	/**
	 * Creates a new AsyncIterable that only contains items that meet a given condition
	 * @param fn callback that tests whether an item should be kept
	 * @param thisArg Optional `this` context to use in the callback
	 */
	filter(fn: (item: T, index?: number) => boolean, thisArg?) : AsyncIteraterHof<T> {
		async function* filter(source : AsyncIterable<T>): AsyncIterable<T> {
			let index = 0;
			for await (let item of source) {
				if (await fn.call(thisArg, item, index))
					yield item;
				index++;
			}
		}
1
		return new AsyncIteraterHof<T>(filter(this.source));
	}

	/**
	 * Searches through the sequence until it finds the first item that matches a given condition and resolves to it
	 * @param fn callback used to find the first item that meets a condition
	 * @param thisArg Optional `this` context to use in the callback
	 */
	async find(fn: (item: T, index?: number) => boolean, thisArg?) : Promise<T | undefined> {
		let index = 0;
		for await(let item of this.source) {
			if(await fn.call(thisArg, item, index))
				return item;
			index++;
		}
	}

	/**
	 * Searches thorugh the sequence until it finds the first item that matches a given condition and returns its index
	 * @param fn callback used to find the first item that meets a condition
	 * @param thisArg Optional `this` context to use in the callback
	 */
	async findIndex(fn: (item: T, index?: number) => boolean, thisArg?) : Promise<number> {
		let index = 0;
		for await (let item of this.source) {
			if (await fn.call(thisArg, item, index))
				return index;
			index++;
		}
		return -1;
	}

	/**
	 * Takes a sequence that may contain Iterable or AsyncIterable items, and flattens it down into a sequence of raw items
	 */
	flatten() : AsyncIteraterHof<T> {
		async function* flatten(source: AsyncIterable<T>) : AsyncIterable<T> {
			for await(let item of source) {
				// TODO: Figure out if this is a dirty hack
				// @ts-ignore
				yield* item;
			}
		}

		return new AsyncIteraterHof<T>(flatten(this.source));
	}

	/**
	 * Iterates over the sequence and executes the callback for each item
	 * @param fn callback to use to iterate over the array
	 * @param thisArg Optional `this` context to use in the callback
	 */
	async forEach(fn: (item: T, index?: number) => void, thisArg?) : Promise<void> {
		let index = 0;
		for await(let item of this.source) {
			await fn.call(thisArg, item, index);
			index++;
		}
	}

	/**
	 * Takes each item and combines them into a string with separators
	 * @param separater The separator to use between items, uses commas by default
	 */
	async join(separater=",") : Promise<string> {
		let result = "";
		let first = true;
		let moreThanOne = false;
		for await (let item of this.source) {
			result += item;
			if(!first) {
				result += separater;
				moreThanOne = true;
			} else {
				first = false;
			}
		}
		if(moreThanOne)
			result = result.slice(0, -1);

		return result;
	}

	/**
	 * Find the index of a particular value in the sequence
	 * @param value The value to search for in the sequence
	 */
	async indexOf(value: T) : Promise<number> {
		return this.findIndex((item: T) => item === value);
	}

	/**
	 * Iterates through the sequence and converts each item to something else
	 * @param fn Callback used to convert each item to a different one
	 * @param thisArg Optional `this` context to use in the callback
	 */
	map<R>(fn: (item: T, index?: number) => R, thisArg): AsyncIteraterHof<R> {
		async function* map<R>(source: AsyncIterable<T>) : AsyncIterable<R> {
			let index = 0;
			for await (let item of source) {
				yield fn.call(thisArg, item, index);
				index++;
			}
		}
		
		return new AsyncIteraterHof<R>(map(this.source));
	}

	/**
	 * Builds up a new value by combining all the items in the sequence. It's pretty complicated so read a blog about it.
	 * @param fn callback to use to compute the next value in the sequence
	 * @param initial 
	 */
	async reduce<R>(fn: (accumulator: R, item: T, index?: number) => R, initial?) : Promise<R> {
		let result = initial;
		let hadInitial = (initial !== undefined);
		let index = 0;
		for await (let item of this.source) {
			if(!hadInitial) {
				result = item;
				hadInitial = false;
			} else {
				result = await fn(result, item, index);
			}
			index++;
		}
		return result;
	}

	/**
	 * Works like reduce, but outputs all intermediate values in a sequence
	 * @param fn callback to use to compute the result of the nest value
	 * @param initial 
	 */
	scan<R>(fn: (accumulator: R, item: T, index?: number) => R, initial?): AsyncIteraterHof<R> {
		async function* scan<R>(source: AsyncIterable<T>): AsyncIterable<R> {
			let result = initial;
			let hadInitial = (initial !== undefined);
			for await (let item of source) {
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

		return new AsyncIteraterHof<R>(scan(this.source));
	}

	/**
	 * Takes a subset of a sequence
	 * @param begin Where to start cloning
	 * @param end Where to end cloning, if omitted, goes to the end
	 */
	async* slice(begin?: number, end?: number) {
		// TODO
	}

	/**
	 * Checks if any items in the sequence match a given condition
	 * @param fn callback used to find if any items meet a condition
	 */
	async some(fn: (T) => boolean) : Promise<boolean> {
		for await (let item of this.source) {
			if(await fn(item))
				return true;
		}

		return false;
	}

	/**
	 * Splits the iterable into multiple consumers so that it can be consumed in parallel
	 * @param n how many splits there should be
	 */
	tee(n: number) : AsyncIterable<T>[] {
		// TODO
		return [];
	}

	/**
	 * Goes through all items in the current sequence, and items in a second sequence and combines them together into arrays of two pairs
	 * @param other the AsyncIterable to merge with
	 */
	zip<R>(other: AsyncIterable<R>): AsyncIteraterHof<[T, R]> {
		async function* zip<R>(source: AsyncIterable<T>) : AsyncIterable<[T, R]> {
			const iterator1 = source[Symbol.asyncIterator]();
			const iterator2 = other[Symbol.asyncIterator]();

			try {
				let isDone = false;
				while(!isDone) {
					let result1 = await iterator1.next();
					if(result1.done) return;
					let result2 = await iterator2.next();
					if(result2.done) return;

					// Typescript can't understand that R is the same in both functions
					// @ts-ignore
					yield [result1.value, result2.value];
				}
			} finally {
				if(iterator1.return)
					iterator1.return();
				if(iterator2.return)
					iterator2.return();
			}
		}

		return new AsyncIteraterHof<[T, R]>(zip(this.source));
	}

	/**
	 * Allows `for-await-of` syntax and combining with other AsyncIterables
	 */
	[Symbol.asyncIterator]() : AsyncIterator<T> {
		return this.source[Symbol.asyncIterator]();
	}
}