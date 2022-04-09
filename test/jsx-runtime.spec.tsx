/** @jsxImportSource ../jsx */
import { render } from '../jsx/jsx-runtime'

declare global {
  let jsxHandlers: any
}

const r = (jsx: any) => {
  const div = document.createElement('div')
  render(jsx, div)
  return div
}

describe('html-jsx', () => {
  it('renders jsx to text', () => {
    expect('' + <div>hello world</div>).toMatchSnapshot()
  })

  it('renders attributes', () => {
    expect('' + <input type="text" value={'hello w"orld'} />).toMatchSnapshot()
  })

  it('fragment', () => {
    expect(
      ''
        + (
          <>
            <div>hello world</div>
            <p>a paragraph</p>
          </>
        )
    ).toMatchSnapshot()
  })

  it('component', () => {
    const Foo = ({ label }: any) => <label>{label}</label>
    expect(
      r(
        <>
          <Foo label="foo" />
        </>
      ).innerHTML
    ).toMatchSnapshot()
  })

  it('list', () => {
    expect(
      ''
        + (
          <ul>
            {[1, 2, 3].map(i => <li>{i}</li>)}
          </ul>
        )
    ).toMatchSnapshot()
  })

  it('handler', () => {
    let count = 0
    const div = r(<button onclick={() => count++}>click me</button>) as any
    div.firstChild.click()
    expect(count).toBe(1)
  })

  it('null', () => {
    expect(r(null).innerHTML).toBe('')
  })

  it('check gc', async () => {
    expect(jsxHandlers.size).toBeGreaterThan(1)
    gc!()
    await new Promise(resolve => setTimeout(resolve, 10))
    expect(jsxHandlers.size).toBe(1)
  })
})
