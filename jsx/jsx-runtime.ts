import type * as jsxi from '../types'

declare global {
  namespace JSX {
    /** The type returned by the `jsx` factory. */
    type Element = VKid

    interface IntrinsicElements extends jsxi.IntrinsicElements {
      [k: string]: unknown
    }

    interface IntrinsicAttributes {
      /** List index key - each item's `key` must be unique. */
      key?: string | number

      /** Passed from above children of this component. */
      children?: VKid
    }

    interface HTMLAttributes<T> extends jsxi.HTMLAttributes<T> {}
    interface SVGAttributes<T> extends jsxi.SVGAttributes<T> {}
    interface DOMAttributes<T> extends jsxi.DOMAttributes<T> {}
  }
}

export type $<T> = (props: T & { children?: any }) => JSX.Element

export const Fragment = ({ children }: any) => children

export const jsx = (tag: VNode['tag'], props: VNode['props'], key: VNode['key']): VNode => ({
  tag,
  props,
  key,
  toString,
})

export const jsxs = jsx

export interface VNode {
  tag: string | typeof Fragment
  props: Record<string, any>
  key: string | number | undefined | void
  toString(): string
}

export type VKid = VKid[] | VNode | string | number | boolean | null | undefined | void

// const trim = (s: string) => s.trim().replace(/(>)(\s{2,})|(\s{2,})(<\/)/g, '$1$4')
const join = (c: string | string[]) => (Array.isArray(c) ? c : c == null ? [] : [c]).map(x => '' + x).join('  ')
const toString = function(this: VNode) {
  const { tag, props } = this
  if (typeof tag != 'string') return join(tag(props))
  const attrs = Object.entries(props)
    .filter(([key]) => !['children'].includes(key))
    .map(([key, value]) =>
      typeof value == 'boolean'
        ? value
          ? key
          : ''
        : `${key}="${
          typeof value == 'function'
            ? `jsxHandlers.get(${Id})[${H.push(value) - 1}].call(this, event)`
            : ('' + value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
        }"`
    )
  return `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>${join(props.children)}</${tag}>`
}

let Id = 0
const ids = new WeakMap()

const handlers = ((globalThis as any).jsxHandlers ??= new Map<number, any>([[0, []]]))
let H: any = handlers.get(0)
const registry = new FinalizationRegistry((id: string) => handlers.delete(+id))

export const render = (jsx: VKid, el: Element | ShadowRoot) => {
  let id = ids.get(el)
  if (!id) ids.set(el, id = (Math.random() * performance.now() * 1e3) | 0)
  handlers.set(Id = id, H = [])
  registry.register(el, id)
  el.innerHTML = '' + (jsx ?? '')
  H = handlers.get(Id = 0)
}
