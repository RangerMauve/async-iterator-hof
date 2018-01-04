[async-iterator-hof](../README.md) > [AsyncIteraterHof](../classes/asynciteraterhof.md)



# Class: AsyncIteraterHof


Takes AsyncIterables and adds methods you'd expect to have in Arrays. All callbacks passed to methods can be either sync or async

## Type parameters
#### T 
## Implements

* `AsyncIterable`.<`T`>

## Index

### Constructors

* [constructor](asynciteraterhof.md#constructor)


### Methods

* [__@asyncIterator](asynciteraterhof.md#___asynciterator)
* [concat](asynciteraterhof.md#concat)
* [every](asynciteraterhof.md#every)
* [filter](asynciteraterhof.md#filter)
* [find](asynciteraterhof.md#find)
* [findIndex](asynciteraterhof.md#findindex)
* [flatten](asynciteraterhof.md#flatten)
* [forEach](asynciteraterhof.md#foreach)
* [includes](asynciteraterhof.md#includes)
* [indexOf](asynciteraterhof.md#indexof)
* [join](asynciteraterhof.md#join)
* [map](asynciteraterhof.md#map)
* [reduce](asynciteraterhof.md#reduce)
* [scan](asynciteraterhof.md#scan)
* [slice](asynciteraterhof.md#slice)
* [some](asynciteraterhof.md#some)
* [tee](asynciteraterhof.md#tee)
* [zip](asynciteraterhof.md#zip)
* [from](asynciteraterhof.md#from)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new AsyncIteraterHof**(source: *`AsyncIterable`.<`T`>*): [AsyncIteraterHof](asynciteraterhof.md)


*Defined in [index.ts:24](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L24)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `AsyncIterable`.<`T`>   |  - |





**Returns:** [AsyncIteraterHof](asynciteraterhof.md)

---



## Methods
<a id="___asynciterator"></a>

###  __@asyncIterator

► **__@asyncIterator**(): `AsyncIterator`.<`T`>



*Defined in [index.ts:304](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L304)*



Allows `for-await-of` syntax and combining with other AsyncIterables




**Returns:** `AsyncIterator`.<`T`>





___

<a id="concat"></a>

###  concat

► **concat**(...args: *`AsyncIterable`.<`T`>[]*): [AsyncIteraterHof](asynciteraterhof.md)`T`



*Defined in [index.ts:34](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L34)*



Concatonates the current AsyncIterable with others into one big AsyncIterable


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| args | `AsyncIterable`.<`T`>[]   |  List of AsyncIterables to add concatenate with this one |





**Returns:** [AsyncIteraterHof](asynciteraterhof.md)`T`





___

<a id="every"></a>

###  every

► **every**(fn: *`function`*, thisArg?: *`any`*): `Promise`.<`boolean`>



*Defined in [index.ts:61](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L61)*



Check if every item in the sequence meets a given condition


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback that tests whether the item meets a certain condition |
| thisArg | `any`   |  Optional `this` context to use in the callback |





**Returns:** `Promise`.<`boolean`>





___

<a id="filter"></a>

###  filter

► **filter**(fn: *`function`*, thisArg?: *`any`*): [AsyncIteraterHof](asynciteraterhof.md)`T`



*Defined in [index.ts:75](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L75)*



Creates a new AsyncIterable that only contains items that meet a given condition


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback that tests whether an item should be kept |
| thisArg | `any`   |  Optional `this` context to use in the callback |





**Returns:** [AsyncIteraterHof](asynciteraterhof.md)`T`





___

<a id="find"></a>

###  find

► **find**(fn: *`function`*, thisArg?: *`any`*): `Promise`.<`T`⎮`undefined`>



*Defined in [index.ts:93](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L93)*



Searches through the sequence until it finds the first item that matches a given condition and resolves to it


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback used to find the first item that meets a condition |
| thisArg | `any`   |  Optional `this` context to use in the callback |





**Returns:** `Promise`.<`T`⎮`undefined`>





___

<a id="findindex"></a>

###  findIndex

► **findIndex**(fn: *`function`*, thisArg?: *`any`*): `Promise`.<`number`>



*Defined in [index.ts:107](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L107)*



Searches thorugh the sequence until it finds the first item that matches a given condition and returns its index


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback used to find the first item that meets a condition |
| thisArg | `any`   |  Optional `this` context to use in the callback |





**Returns:** `Promise`.<`number`>





___

<a id="flatten"></a>

###  flatten

► **flatten**(): [AsyncIteraterHof](asynciteraterhof.md)`T`



*Defined in [index.ts:120](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L120)*



Takes a sequence that may contain Iterable or AsyncIterable items, and flattens it down into a sequence of raw items




**Returns:** [AsyncIteraterHof](asynciteraterhof.md)`T`





___

<a id="foreach"></a>

###  forEach

► **forEach**(fn: *`function`*, thisArg?: *`any`*): `Promise`.<`void`>



*Defined in [index.ts:137](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L137)*



Iterates over the sequence and executes the callback for each item


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback to use to iterate over the array |
| thisArg | `any`   |  Optional `this` context to use in the callback |





**Returns:** `Promise`.<`void`>





___

<a id="includes"></a>

###  includes

► **includes**(value: *`T`*): `Promise`.<`boolean`>



*Defined in [index.ts:49](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L49)*



Checks to see if a value exists in the sequence


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T`   |  The value to look for |





**Returns:** `Promise`.<`boolean`>





___

<a id="indexof"></a>

###  indexOf

► **indexOf**(value: *`T`*): `Promise`.<`number`>



*Defined in [index.ts:172](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L172)*



Find the index of a particular value in the sequence


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T`   |  The value to search for in the sequence |





**Returns:** `Promise`.<`number`>





___

<a id="join"></a>

###  join

► **join**(separater?: *`string`*): `Promise`.<`string`>



*Defined in [index.ts:149](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L149)*



Takes each item and combines them into a string with separators


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| separater | `string`  | &quot;,&quot; |   The separator to use between items, uses commas by default |





**Returns:** `Promise`.<`string`>





___

<a id="map"></a>

###  map

► **map**R(fn: *`function`*, thisArg: *`any`*): [AsyncIteraterHof](asynciteraterhof.md)`R`



*Defined in [index.ts:181](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L181)*



Iterates through the sequence and converts each item to something else


**Type parameters:**

#### R 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  Callback used to convert each item to a different one |
| thisArg | `any`   |  Optional `this` context to use in the callback |





**Returns:** [AsyncIteraterHof](asynciteraterhof.md)`R`





___

<a id="reduce"></a>

###  reduce

► **reduce**R(fn: *`function`*, initial?: *`any`*): `Promise`.<`R`>



*Defined in [index.ts:198](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L198)*



Builds up a new value by combining all the items in the sequence. It's pretty complicated so read a blog about it.


**Type parameters:**

#### R 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback to use to compute the next value in the sequence |
| initial | `any`   |  - |





**Returns:** `Promise`.<`R`>





___

<a id="scan"></a>

###  scan

► **scan**R(fn: *`function`*, initial?: *`any`*): [AsyncIteraterHof](asynciteraterhof.md)`R`



*Defined in [index.ts:219](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L219)*



Works like reduce, but outputs all intermediate values in a sequence


**Type parameters:**

#### R 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback to use to compute the result of the nest value |
| initial | `any`   |  - |





**Returns:** [AsyncIteraterHof](asynciteraterhof.md)`R`





___

<a id="slice"></a>

###  slice

► **slice**(begin?: *`number`*, end?: *`number`*): `AsyncIterableIterator`.<`any`>



*Defined in [index.ts:243](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L243)*



Takes a subset of a sequence


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| begin | `number`   |  Where to start cloning |
| end | `number`   |  Where to end cloning, if omitted, goes to the end |





**Returns:** `AsyncIterableIterator`.<`any`>





___

<a id="some"></a>

###  some

► **some**(fn: *`function`*): `Promise`.<`boolean`>



*Defined in [index.ts:251](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L251)*



Checks if any items in the sequence match a given condition


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `function`   |  callback used to find if any items meet a condition |





**Returns:** `Promise`.<`boolean`>





___

<a id="tee"></a>

###  tee

► **tee**(n: *`number`*): `AsyncIterable`.<`T`>[]



*Defined in [index.ts:264](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L264)*



Splits the iterable into multiple consumers so that it can be consumed in parallel


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| n | `number`   |  how many splits there should be |





**Returns:** `AsyncIterable`.<`T`>[]





___

<a id="zip"></a>

###  zip

► **zip**R(other: *`AsyncIterable`.<`R`>*): [AsyncIteraterHof](asynciteraterhof.md)[`T`,`R`]



*Defined in [index.ts:273](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L273)*



Goes through all items in the current sequence, and items in a second sequence and combines them together into arrays of two pairs


**Type parameters:**

#### R 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| other | `AsyncIterable`.<`R`>   |  the AsyncIterable to merge with |





**Returns:** [AsyncIteraterHof](asynciteraterhof.md)[`T`,`R`]





___

<a id="from"></a>

### «Static» from

► **from**T(source: *`T`⎮`Promise`.<`T`>⎮`Iterable`.<`T`>⎮`AsyncIterable`.<`T`>*): [AsyncIteraterHof](asynciteraterhof.md)`T`



*Defined in [index.ts:9](https://github.com/RangerMauve/async-iterator-hof/blob/4f5d698/index.ts#L9)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `T`⎮`Promise`.<`T`>⎮`Iterable`.<`T`>⎮`AsyncIterable`.<`T`>   |  - |





**Returns:** [AsyncIteraterHof](asynciteraterhof.md)`T`





___


