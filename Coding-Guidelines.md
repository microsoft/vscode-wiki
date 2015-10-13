
##Events

* We use `Event<T>` which exposes events as a function to which you subscribe by calling that function. The return value is a disposable which removes the event subscription.

* We use `onDidVerbNoun?` and `onWillVerbNoun?`. For instance `onWillCloseSidebar`, `onDidiShutdownWorkbench`. The noun is optional if the scope provided enough identification, like `document#onDidChange` but `document#onWillDeleteLine`.

## Getter/Setter vs. Properties

* We use a property assignment when the assignment only alters that property but doesn't do anything else. We use a set/get method when value checking is performed, when events are send out, when other properties are updates etc.

## Promise - resolve vs. reject

* We don't use the reject path for expected conditions. For instance, when asking for the existence of a file a project resolves with a boolean instead rejecting. Similar, cancelling user input resolves with undefined instead or rejecting, `shell.showQuickPick:Promise`.

## Interface with I

* We *only* prefix interfaces with a uppercase `I` when it's supposed to be implemented by clients. That is it appears after the implements keyword. We don't use I-names when defining function signature or property bags.

## Prefix private member

* *All* private members of classes are prefixed with an `_`, such as `class Foo { private _bar;}`.
