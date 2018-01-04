if (!Symbol.asyncIterator)
	// @ts-ignore
	Symbol.asyncIterator = Symbol.for("asyncIterator");

import AsyncIterator from "./";


async function* makeSequence(n) {
	let i = n;
	while (i--) {
		yield i;
		await delay(100);
	}
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const evens = (new AsyncIterator(makeSequence(10))).filter((n) => !(n % 2));
const odds = (new AsyncIterator(makeSequence(10))).filter((n) => !!(n % 2));

const combined = evens.concat(odds);

combined.forEach((n) => console.log(n));

// Will output 8 6 4 2 0 9 7 5 3 1