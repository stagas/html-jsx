import type * as jsxi from '../types'

declare global {
  namespace JSX {
    /** The type returned by the `jsx` factory. */
    type Element = string

    interface IntrinsicElements extends jsxi.IntrinsicElements {
      [k: string]: unknown
    }

    interface IntrinsicAttributes {
      /** List index key - each item's `key` must be unique. */
      key?: string | number

      /** Passed from above children of this component. */
      children?: string
    }

    interface HTMLAttributes<T> extends jsxi.HTMLAttributes<T> {}
    interface SVGAttributes<T> extends jsxi.SVGAttributes<T> {}
    interface DOMAttributes<T> extends jsxi.DOMAttributes<T> {}
  }
}

export type $<T> = (props: T & { children?: any }) => JSX.Element

export const Fragment = ({ children }: any) => children

export const jsx = (tag: VNode['tag'], props: VNode['props'], _key: VNode['key']): string => {
  if (typeof tag != 'string') return join(tag(props))
  const attrs = Object.entries(props)
    .filter(([key]) => !['children'].includes(key))
    .map(([key, value]) =>
      typeof value == 'boolean'
        ? value
          ? key
          : ''
        : `${key}="${('' + value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`
    )
  return `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>${join(props.children)}</${tag}>`
}

export const jsxs = jsx

export interface VNode {
  tag: string | typeof Fragment
  props: Record<string, any>
  key: string | number | undefined | void
  toString(): string
}

export type VKid = VKid[] | VNode | string | number | boolean | null | undefined | void

// const trim = (s: string) => s.trim().replace(/(>)(\s{2,})|(\s{2,})(<\/)/g, '$1$4')
const join = (c: string | string[]) => (Array.isArray(c) ? c : c == null ? [] : [c]).join('  ')

export const render = (jsx: VKid, el: Element | ShadowRoot) => {
  el.innerHTML = (jsx as string) ?? ''
}
