/** @jsxImportSource ../jsx */

import { $, render } from '../jsx/jsx-runtime'
const App: $<{ who: string }> = ({ who }) => <h1>Hello, {who}!</h1>
render(<App who="world" />, document.body)
