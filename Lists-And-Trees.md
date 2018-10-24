## List

In its core, the list is a virtual rendering engine. Given a collection of elements, it will let you render those elements in a scrollable view, while making sure only the visible elements actually end up in the DOM, at any given point in time. Avoiding to render all the elements in the DOM _a priori_ is the essence behind the list's performance. You can easily add 100k elements to it and not even break a sweat.

A requirement of virtual rendering is the need to know each element's height in pixels before it gets rendered. At runtime, the list will ask the height to a provided virtual rendering controller, keep an in-memory map of each element's height and track the viewport's position in order to know which elements should be rendered in and out of the DOM. Note that each item can have its own height: it's not a requirement that items should have all the same height.

Given that the collection model for a list is a simple array, the API to modify a list's element collection is very simple. The `splice` call allows for deleting and inserting continuous items in the list. Here's a simplified version of it:

```ts
class List<T> {
  splice(start: number, deleteCount: number, toInsert: T[]): void
}
```

> List splice animation

Apart from being a virtual rendering engine, the `List` provides quite a lot of functionality that actually make it a usable widget: keyboard and mouse navigation, focus and selection traits, accessibility roles, etc. These features are what defines `List` as a usable widget across our workbench.

## Index Tree

A tree UI widget should be able to represent tree-like data, eg. a file explorer. A rendered tree can always be rendered as a list; it is each row's indentation level and twistie indicators which give the user the perception of tree structure. By leveraging the virtual rendering functionalites of the list we can use composition to create a tree widget.

There is the question of API: how can we keep a tree-like structure API relatively simple, yet allow for complex operations, such as removing and inserting whole subtrees? If we take the same `splice` analogy as the list's (pick a location, remove some elements and add other elements), it's possible to come up with a tree `splice` call, in which the location is multi-dimensional (the first element of the `start` array represents the index in the root's children array; the `n`-th element of the `start` array represents the index in the `n - 1`-th children array) and the elements to insert are entire subtrees.

```ts
interface TreeElement<T> {
  element: T;
  children: TreeElement<T>[];
}

class IndexTree<T> {
  splice(start: number[], deleteCount: number, toInsert: TreeElement<T>[]): void;
}
```

The `IndexTree`'s main responsibility is to map tree `splice` calls into list `splice` calls. It is a composition of the `List` widget in order to provide enough functionality to render tree-like models with the correct identation levels and twistie states per element. It also provides additional keyboard and mouse handling in order to support tree operations such as expand, collapse, select parent node, etc.

Additionally, the `IndexTree` supports filtering. An instance of `IndexTree` can be created with a filter which can have fine grained control of which elements should be filtered out of the view. The `filter` call can optionally return additional data computed during its operation, which will be passed along to the tree renderer; this is useful in cases where substring highlights are computed during the filtering phase and need to be reused during the rendering phase.

## Object Tree

Once all the hard work has been done by the `IndexTree` in order to map a tree `splice` call into a `list` splice call, we're left with a powerful and performant yet hard-to-use tree widget.

- Built on top of Index Tree
- Object-addressable locations, easier API

Conceptually:

```ts
class ObjectTree<T> {
  setChildren(element: T | null, children: T[]): void;
}
```

## Data Tree

- Built on Object Tree
- Automatic resolution of conflicting refresh calls
- Loading twistie

Conceptually:

```ts
interface IDataSource<T> {
  hasChildren(element: T | null): boolean;
  getChildren(element: T | null): Thenable<T[]>;
}

class DataTree<T> {
  constructor(dataSource: IDataSource<T>);
  refresh(element: T | null): Thenable<void>;
}
```

---

## Paged List

Build on top of list.

```ts
export interface IPagedModel<T> {
  length: number;
  isResolved(index: number): boolean;
  get(index: number): T;
  resolve(index: number): Thenable<T>;
}

class PagedList<T> {
  model: IPagedModel<T>;
}
```