## List

In its core, the list is a virtual rendering engine. Given a collection of elements, it will let you render those elements in a scrollable view, while making sure only the visible elements actually end up in the DOM, at any given point in time. Avoiding to render all the elements in the DOM _a priori_ is the essence behind the list's performance. You can easily add 100k elements to it and not even break a sweat.

In order to use it, you must specify the height of every element in pixels before it gets rendered on the screen, by implementing the [`IListVirtualDelegate`](https://github.com/Microsoft/vscode/blob/12bc7c7f474fbd6779814a89f4c4c72136e97cf5/src/vs/base/browser/ui/list/list.ts#L8) interface. At runtime, the list will keep an in-memory map of each element's height and track the viewport's position in order to know which elements should be rendered in and out of the DOM. Note that item heights can be variable, though  A renderer needs to implement the [`IListRenderer`](https://github.com/Microsoft/vscode/blob/12bc7c7f474fbd6779814a89f4c4c72136e97cf5/src/vs/base/browser/ui/list/list.ts#L13) interface.

Given that the collection model for a list is a simple array, the API to modify a list's element collection is very simple. The `splice` call allows for deleting and inserting continuous items in the list:

```ts
class List<T> {
  splice(start: number, deleteCount: number, toInsert: T[]): void
}
```

The `List` widget provides quite a bit of UX functionality on top of the basic rendering engine: keyboard and mouse navigation, focus and selection traits, accessibility roles, etc. These features are what defines `List` as a usable widget across our workbench.

## Index Tree

- Built on top of list
- Expand, collapse functionality
- Filter functionality

Conceptually:

```ts
class IndexTree<T> {
  splice(start: number[], deleteCount: number, toInsert: T[]): void;
}
```

## Object Tree

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