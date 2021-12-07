import { h, Fragment } from './h'

interface MyCustomElement {
  /** A custom attribute. */
  customattribute: 'foo' | 'bar'
  /** A flag attribute. */
  someflag?: boolean
  /** A callback function. */
  onchange: () => void
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * A `<my-custom-element>` tag that is perfect for our application.
       * An example of how we can extend from `HTMLAttributes`.
       */
      'my-custom-element': MyCustomElement & HTMLAttributes<MyCustomElement>
    }
  }
}

document.body.innerHTML = (
  <>
    <input type="text" autocomplete="billing" onkeydown={e => console.log(e.key)} />
    <button></button>
    <span key={1}>hello world</span>
    <span>
      here is <a>a link</a>
    </span>
    <img crossorigin="anonymous" />
    <my-custom-element customattribute="foo" someflag onchange={() => null} />
  </>
)
