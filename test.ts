import * as test from "tape-async";
import AsyncIterator from "./index";

test("AsyncIterator.constructor", async function(t) {
	const iterator = new AsyncIterator<number>(
		fromArray([1, 2, 3, 4])
	);

	const result = await toArray(iterator);

	t.deepEquals(result, [1,2,3,4], "Got sequence back out of AsyncIterator");
});

test("AsyncIterator.constructor (from AsyncIterator)", async function (t) {
	const iterator = new AsyncIterator(
		new AsyncIterator<number>(
			fromArray([1, 2, 3, 4])
		)
	);

	var result = await toArray(iterator);

	t.deepEquals(result, [1, 2, 3, 4], "Got the sequence back out of the cloned AsyncIterator");

});


test.skip("Should be able to iterate via forEach with a sync function");
test.skip("Should be able to iterate via forEach with an async function");
test.skip("Should be able to map with a sync function");
test.skip("Should be able to map with an async function");
test.skip("Should be able to filter with sync function");
test.skip("Should be able to filter")

async function toArray<T>(source: AsyncIterable<T>) {
	const result = [];
	for await(let item of source) {
		result.push(item);
	}

	return result;
}

async function* fromArray<T>(source: Array<T>) {
	for(let item of source) {
		yield await item;
	}
}