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


## Preview

- See [demo](https://streamich.github.io/collaborative-ace).
