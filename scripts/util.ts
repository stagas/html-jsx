/* eslint-disable @typescript-eslint/no-explicit-any */
import ts, { factory } from 'typescript'

interface Element {
  name: string
  cite: string
  type: string
  enum?: string[]
  description: string
  attributes: any[]
  permittedStructures: any
}

const comment = (text: string) =>
  factory.createJSDocComment(
    factory.createNodeArray(
      text
        .split('\n')
        .map(line => [factory.createJSDocText(line.replace(/&/g, '&amp;').replace(/<([^>]*)>/g, m => `\`${m}\``)), factory.createJSDocText('\n')])
        .flat()
    )
  )

export const Union = (els: Element[]) => factory.createUnionTypeNode(els.map(e => factory.createLiteralTypeNode(factory.createStringLiteral(e.name))))

// prettier-ignore
export const Type = (t: Element) =>
    special[t.name] ? special[t.name]
  : (booleans[t.name] ?? t.type === 'Boolean') ? factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
  : (numbers[t.name] ?? (t.type.toLowerCase().endsWith('int') || t.type === 'Number')) ? factory.createUnionTypeNode([
      factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
      factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    ])
  : t.type.endsWith('List') ? factory.createUnionTypeNode([
      factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
      factory.createArrayTypeNode(factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)),
    ])
  : t.enum ? Union(t.enum.map(e => ({ name: e })) as any)
  : t.name.startsWith('on') || t.type === 'Function' ? factory.createTypeReferenceNode(
      factory.createIdentifier("EventHandler"),
      [
        factory.createTypeReferenceNode(
          factory.createIdentifier("T"),
          undefined
        ),
        factory.createTypeReferenceNode(
          factory.createIdentifier("Event"),
          undefined
        )
      ]
    )
  : factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)

export const Attribute = (p: Element) => [
  comment(p.description),
  factory.createPropertySignature(
    undefined,
    factory.createIdentifier('"' + p.name + '"'),
    factory.createToken(ts.SyntaxKind.QuestionToken),
    Type(p) as any
  ),
]

export const ElementInterface = (e: Element, globalAttrs: string[]) =>
  attrs(e).length
    ? factory.createInterfaceDeclaration(
        undefined,
        undefined,
        factory.createIdentifier(pascal(e.name) + 'HTMLAttributes'),
        [factory.createTypeParameterDeclaration(factory.createIdentifier('T'), undefined, undefined)],
        [
          factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
            factory.createExpressionWithTypeArguments(factory.createIdentifier('HTMLAttributes'), [
              factory.createTypeReferenceNode(factory.createIdentifier('T'), undefined),
            ]),
          ]),
        ],
        attrs(e)
          .filter(a => !globalAttrs.includes(a.name))
          .map(Attribute)
          .flat()
          .filter(Boolean) as any
      )
    : undefined

export const ElementProperty = (e: Element) => [
  comment(
    e.description +
      (e.permittedStructures.contents && e.permittedStructures.summary.length ? '\n\n**Content:** ' + e.permittedStructures.summary : '') +
      (attrs(e).length
        ? `\n\n| Attribute | Type | Description\n|--|--|--\n` +
          attrs(e)
            .map(e => `| \`${e.name}\` | _${e.type}_ | ${e.description.split('.')[0]}.`)
            .join('\n')
        : '') +
      (e.cite ? `\n\n[${e.cite.includes('mozilla') ? 'MDN ' : ''}Reference](${e.cite})` : '')
  ),
  factory.createPropertySignature(
    undefined,
    factory.createIdentifier(e.name),
    undefined,
    factory.createTypeReferenceNode(factory.createIdentifier((attrs(e).length ? pascal(e.name) : '') + 'HTMLAttributes'), [
      factory.createTypeReferenceNode(factory.createIdentifier(`HTML${attrs(e).length ? ids[e.name] ?? pascal(e.name) : ''}Element`), undefined),
    ])
  ),
]

const typeref = (name: string) => factory.createTypeReferenceNode(factory.createIdentifier(name), undefined)

const attrs = (e: Element) => e.attributes.filter(a => a[0] !== '#')

const pascal = (name: string) => name[0].toUpperCase() + name.slice(1).toLowerCase()

const booleans = {
  autofocus: true,
} as any

const numbers = {
  tabindex: true,
} as any

export const banned = ['image']

const ids = {
  a: 'Anchor',
  applet: '',
  basefont: '',
  bdo: '',
  bgsound: '',
  blockquote: '',
  br: 'BR',
  caption: '',
  col: 'TableCol',
  colgroup: 'TableCol',
  content: '',
  datalist: 'DataList',
  dd: '',
  del: '',
  dir: '',
  dl: 'DList',
  fieldset: 'FieldSet',
  frameset: 'FrameSet',
  h1: 'Heading',
  h2: 'Heading',
  h3: 'Heading',
  h4: 'Heading',
  h5: 'Heading',
  h6: 'Heading',
  hr: 'HR',
  iframe: 'IFrame',
  img: 'Image',
  ins: 'Mod',
  keygen: '',
  li: 'LI',
  menuitem: '',
  ol: 'OList',
  optgroup: 'OptGroup',
  p: 'Paragraph',
  portal: '',
  q: 'Quote',
  spacer: '',
  tbody: 'TableSection',
  td: 'TableDataCell',
  textarea: 'TextArea',
  tfoot: 'TableSection',
  th: 'TableHeaderCell',
  thead: 'TableSection',
  tr: 'TableRow',
  ul: 'UList',
} as any

const special = {
  as: typeref('HTMLLinkAs'),
  autocapitalize: typeref('HTMLAutocapitalize'),
  autocomplete: typeref('HTMLAutocomplete'),
  crossorigin: typeref('HTMLCrossorigin'),
  dir: typeref('HTMLDir'),
  encoding: typeref('HTMLFormEncType'),
  enctype: typeref('HTMLFormEncType'),
  formmethod: typeref('HTMLFormMethod'),
  method: typeref('HTMLFormMethod'),
  referrerpolicy: typeref('HTMLReferrerPolicy'),
  role: typeref('HTMLRole'),
  sandbox: typeref('HTMLIframeSandbox'),
  style: factory.createUnionTypeNode([typeref('CSSProperties'), factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)]),
  type: factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
} as any
