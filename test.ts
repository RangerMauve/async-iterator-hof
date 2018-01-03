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

test("AsyncIterator.forEach sync function", async function(t){
	t.plan(4);
	const iterator = new AsyncIterator<number>(
		fromArray([1,2,3,4])
	);

	await iterator.forEach((value, index) => t.equal(value, index + 1, "Got proper value at index " + index));
});
test("AsyncIterator.forEach async function", async function (t) {
	t.plan(4);
	const iterator = new AsyncIterator<number>(
		fromArray([1, 2, 3, 4])
	);

	await iterator.forEach( async (value, index) => t.equal(value, index + 1, "Got proper value at index " + index));
});
test.skip("AsyncIterator.map sync function");
test.skip("AsyncIterator.map async function");
test.skip("AsyncIterator.filter sync function");
test.skip("AsyncIterator.filter async function");

test.skip("AsyncIterator.every sync function");
test.skip("AsyncIterator.every async function");
test.skip("AsyncIterator.some sync function");
test.skip("AsyncIterator.some async function");
test.skip("AsyncIterator.includes sync function");
test.skip("AsyncIterator.includes async function");

test.skip("AsyncIterator.find sync function");
test.skip("AsyncIterator.find async function");
test.skip("AsyncIterator.findIndex sync function");
test.skip("AsyncIterator.findIndex async function");
test.skip("AsyncIterator.indexOf");

test.skip("AsyncIterator.reduce sync function");
test.skip("AsyncIterator.reduce async function");
test.skip("AsyncIterator.scan sync function");
test.skip("AsyncIterator.scan async function");

test.skip("AsyncIterator.flatten sync iterators");
test.skip("AsyncIterator.flatten async iterators");
test.skip("AsyncIterator.concat sync iterator");
test.skip("AsyncIterator.concat async iterator");
test.skip("AsyncIterator.concat sync iterators");
test.skip("AsyncIterator.concat async iterators");
test.skip("AsyncIterator.join default separator");
test.skip("AsyncIterator.join custom separator");


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