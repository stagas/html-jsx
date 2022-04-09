import { HTMLElements } from './html'
import { SVGElements } from './svg'

export * from './dom'
export * from './html'
export * from './svg'

export interface IntrinsicElements extends HTMLElements, SVGElements {}
