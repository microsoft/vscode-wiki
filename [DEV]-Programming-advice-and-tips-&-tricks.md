This page is a collection of FYI- and TIL-items that spotlights particular useful utilities or programming patterns that aren't obvious or little known. Take them as an offering and not as some must-do.


### Disposable utils

TODO@Matt

### Data structures

* native `Map` and `Set` are sorted by [insertion order](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#description) 💡 this is a little-know but can come handy
* `ResourceMap` and `ResourceSet` which are normal maps/sets but keyed by `URI` (`src/vs/base/common/map.ts`)
* `LRUCache` is a map with recency and trimming abilities (`src/vs/base/common/map.ts`)
* `TernarySearchTree` is map-like with the ability to lookup sub and super-strings (useful for path containment) (`src/vs/base/common/map.ts`)
* `SkipList` is a map which is sorted based on a custom comparator function (`src/vs/base/common/skipList.ts`)
* `LinkedList` like arrays but with faster removal/insertion (`src/vs/base/common/linkedList.ts`)

### String/array utils

The modules `src/vs/base/common/arrays.ts` and `src/vs/base/common/strings.ts` have many very useful utilities when dealing with arrays or strings.

### Iterables

The `src/vs/base/common/iterator.ts` modules contains utilities for working with iterables. Iterables can be a better alternative than arrays because they enforce readonly-ness by design and hence saving `Array.slice`-calls