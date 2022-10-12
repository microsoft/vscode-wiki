This page is a collection of FYI- and TIL-items that spotlights particular useful utilities or programming patterns that aren't obvious or little known. Take them as an offering and not as some must-do.


### Disposable utils

TODO@Matt

### Data structures

* native `Map` and `Set` are sorted by [insertion order](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#description) 💡 this is a little-know but can come handy
* [`ResourceMap`](https://github.com/microsoft/vscode/blob/8c946e23f45f39fdd982cff1e1fce02a8e3dc719/src/vs/base/common/map.ts#L771) and [`ResourceSet`](https://github.com/microsoft/vscode/blob/8c946e23f45f39fdd982cff1e1fce02a8e3dc719/src/vs/base/common/map.ts#L862)  which are normal maps/sets but keyed by `URI` (`src/vs/base/common/map.ts`)
* [`LRUCache`](https://github.com/microsoft/vscode/blob/8c946e23f45f39fdd982cff1e1fce02a8e3dc719/src/vs/base/common/map.ts#L1313) is a map with recency and trimming abilities (`src/vs/base/common/map.ts`)
* [`TernarySearchTree](https://github.com/microsoft/vscode/blob/8c946e23f45f39fdd982cff1e1fce02a8e3dc719/src/vs/base/common/map.ts#L333) is map-like with the ability to lookup sub and super-strings (useful for path containment) (`src/vs/base/common/map.ts`)
* [`SkipList`](https://github.com/microsoft/vscode/blob/8c946e23f45f39fdd982cff1e1fce02a8e3dc719/src/vs/base/common/skipList.ts#L20) is a map which is sorted based on a custom comparator function (`src/vs/base/common/skipList.ts`)
* [`LinkedList`](https://github.com/microsoft/vscode/blob/8c946e23f45f39fdd982cff1e1fce02a8e3dc719/src/vs/base/common/linkedList.ts#L21) like arrays but with faster removal/insertion (`src/vs/base/common/linkedList.ts`)

### String/array utils

The modules `src/vs/base/common/arrays.ts` and `src/vs/base/common/strings.ts` have many very useful utilities when dealing with arrays or strings.

### Iterables

The `src/vs/base/common/iterator.ts` modules contains utilities for working with iterables. Iterables can be a better alternative than arrays because they enforce readonly-ness by design and hence saving `Array.slice`-calls