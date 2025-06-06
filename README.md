# Ace editor collaborative editing binding

Makes a plain Ace editor instance collaborative by binding it to a JSON CRDT
document `str` node. This allows multiple users to edit the same document
json-joy JSON CRDT document concurrently through the Ace editor.


## Usage

Installation:

```
npm install json-joy ace-builds collaborative-ace
```

Usage:

```ts
import {bind} from 'collaborative-ace';
import {Model} from 'json-joy/es2020/json-crdt';

// ...

const unbind = bind(str, editor);

// When done, unbind the binding.
binding.unbind();
```


## React Usage

Installation:

```
npm install json-joy ace-builds collaborative-ace react-ace react react-dom
```

Usage:

You use the `<CollaborativeAce>` component exactly the same as the `<AceEditor>`
component from [`react-ace`](https://www.npmjs.com/package/react-ace), with the
only difference that you pass a `str` node from a JSON CRDT document instead of
a plain string `value` prop.

```tsx
import {Model, s} from 'json-joy/lib/json-crdt';
import {CollaborativeAce} from 'collaborative-ace/lib/CollaborativeAce';

const model = Model.create(s.str('hello'));

const MyComponent = () => {
  return <CollaborativeAce str={model.s.toApi()} />
};
```


## Preview

- See [demo](https://streamich.github.io/collaborative-ace).
