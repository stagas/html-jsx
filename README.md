<h1 align="center">html-jsx</h1>

<p align="center">
extensible jsx type definitions for standard html interfaces
</p>

<p align="center">
   <a href="#install">        🔧 <strong>Install</strong></a>
 · <a href="#usage">        🧩 <strong>Usage</strong></a>
 · <a href="https://github.com/stagas/html-jsx/releases"> 🔥 <strong>Releases</strong></a>
 · <a href="#contribute">     💪🏼 <strong>Contribute</strong></a>
 · <a href="https://github.com/stagas/html-jsx/issues">   🖐️ <strong>Help</strong></a>
</p>

---

## Install

```sh
$ npm i html-jsx
```

## Usage

Because of the way TypeScript and JSX work, we have to insert this
piece of code where the `createElement` (or `h`) factory lives in
order for the types to be picked up correctly by the compiler:

```ts
import type * as jsx from 'html-jsx'

// this declaration allows us to augment JSX interfaces
declare module 'html-jsx' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> extends JSX.IntrinsicAttributes {
    // here we could add attributes specific only to DOM elements (HTML+SVG)
  }
}

// this introduces our JSX definitions into the global scope
declare global {
  namespace JSX {
    /** The type returned by our `createElement` factory. */
    type Element = string

    interface IntrinsicElements extends jsx.IntrinsicElements {
      /** This allows for any tag to be used. */
      [k: string]: unknown
    }

    // here we can add attributes for all the elements
    interface IntrinsicAttributes {
      /** List index key - each item's `key` must be unique. */
      key?: string | number
    }

    /**
     * These are exported to the global JSX namespace to allow
     * declaring custom elements types.
     * @see `playground/app.tsx`
     */
    interface HTMLAttributes<T> extends jsx.HTMLAttributes<T> {}
    interface SVGAttributes<T> extends jsx.SVGAttributes<T> {}
    interface DOMAttributes<T> extends jsx.DOMAttributes<T> {}
  }
}
```

After this, html JSX tags in our application(or library) plus anything else that depends on it, should be properly picking up the types, with intellisense, documentation and lint working.

See [playground](playground/) for more usage details.

## Extras

An [eslint](https://github.com/eslint/eslint) configuration based on [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
that only enables JSX rules that would possibly cause problems is available [here](https://github.com/stagas/eslint-config-html-jsx). No stylistic rules are applied (use [Prettier](https://github.com/prettier/prettier) for this). It also sets up the JSX pragma to `h` and the fragment to `Fragment` which is probably what you need. All these can be configured again, or you can use the react plugin directly. This is only for convenience for my own projects basically but distributing it to save someone's time potentially.

To use it, just install it and add to your eslint config:

```sh
$ npm i eslint-config-html-jsx
```

eslintrc.js:

```js
...
  extends: ['html-jsx'],
...
```

## Credits

- [markuplint](https://github.com/markuplint/markuplint/) for the [html-spec](https://github.com/markuplint/markuplint/tree/main/packages/%40markuplint/html-spec) data which are used to generate _most_ of the HTML types and documentation.

- [ko-jsx](https://github.com/ryansolid/ko-jsx/blob/master/src/jsx.d.ts) which this was based on, which was
  itself based on [Surplus](https://github.com/adamhaile/surplus/blob/master/index.d.ts) and [Inferno](https://github.com/infernojs/inferno/blob/master/packages/inferno/src/core/types.ts) which were themselves based off React's.

- [CSSType](https://github.com/frenic/csstype/) for the rules that are used in the `style` attributes.

- Of course, [Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web) which all of the previous are based on.

- Many thanks to everyone who contributed.

## Contribute

[Fork](https://github.com/stagas/html-jsx/fork) or
[edit](https://github.dev/stagas/html-jsx) and submit a PR.

All contributions are welcome!

## License

MIT &copy; 2021
[stagas](https://github.com/stagas)
