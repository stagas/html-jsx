/**
 * Poor Man's React.
 *
 * Renders JSX expressions as HTML strings.
 *
 * Detail: function event handlers added to the global (window),
 * and as such, they will leak memory every time this is
 * called unless they are deleted somehow.
 */

let handlers = 0

export const Fragment = Symbol()

export const h = (tag: string | typeof Fragment, props: Record<string, never> | null, ...children: never[]) =>
  tag === Fragment
    ? children.join(' ')
    : `<${tag} ${Object.entries(props ?? {})
        .map(([key, value]) =>
          typeof value === 'boolean'
            ? value
              ? key
              : ''
            : key +
              '="' +
              (typeof value === 'function'
                ? (((window as any)[`h${++handlers}`] = value), `h${handlers}(event)`)
                : ('' + value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')) +
              '"'
        )
        .join(' ')}>${children.join(' ')}</${tag}>`

//
// and the JSX types injection (must live in the same file as the `h` function above):
//

import type * as jsx from '../src'

// this declaration allows us to augment JSX interfaces
declare module '../src' {
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
