/* eslint-disable @typescript-eslint/no-explicit-any */
import spec from '@markuplint/html-spec/index.json'
import * as fs from 'fs'
import { join } from 'path'
import ts, { factory } from 'typescript'
import { Attribute, banned, ElementInterface, ElementProperty, Union } from './util'

const rootDir = join(__dirname, '..')

const file = ts.createSourceFile(join(rootDir, 'src', 'html.ts'), '', ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS)
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

const globalAttrs = spec.def['#globalAttrs'].map(a => a.name)

const output = [
  factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(
          false,
          factory.createIdentifier('StandardProperties'),
          factory.createIdentifier('CSSProperties')
        ),
      ])
    ),
    factory.createStringLiteral('csstype'),
    undefined
  ),
  factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('AriaAttributes')),
      ])
    ),
    factory.createStringLiteral('./aria'),
    undefined
  ),
  factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('DOMAttributes')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('EventHandler')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLAutocapitalize')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLAutocomplete')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLCrossorigin')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLDir')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLFormEncType')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLFormMethod')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLIframeSandbox')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLLinkAs')),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier('HTMLReferrerPolicy')),
      ])
    ),
    factory.createStringLiteral('./dom'),
    undefined
  ),
  factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier('HTMLRole'),
    undefined,
    Union(spec.def['#roles'] as any) as any
  ),
  factory.createInterfaceDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier('HTMLAttributes'),
    [factory.createTypeParameterDeclaration(factory.createIdentifier('T'), undefined, undefined)],
    [
      factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
        factory.createExpressionWithTypeArguments(factory.createIdentifier('AriaAttributes'), undefined),
        factory.createExpressionWithTypeArguments(factory.createIdentifier('DOMAttributes'), [
          factory.createTypeReferenceNode(factory.createIdentifier('T'), undefined),
        ]),
      ]),
    ],
    spec.def['#globalAttrs']
      .filter(a => !a.name.startsWith('on'))
      .filter(a => !a.name.startsWith('data-'))
      .map(Attribute as any)
      .flat()
      .filter(Boolean) as any
  ),
  ...spec.specs
    .filter(e => !banned.includes(e.name))
    .map(e => ElementInterface(e as any, globalAttrs) as any)
    .filter(Boolean),
  factory.createInterfaceDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier('HTMLElements'),
    undefined,
    undefined,
    (spec.specs.filter(e => !banned.includes(e.name)).map(ElementProperty as any) as any).flat()
  ),
]

const contents = output.map(node => printer.printNode(ts.EmitHint.Unspecified, node, file)).join('\n')
const outDir = join(rootDir, 'src')
const outFile = join(outDir, 'html.ts')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(outFile, contents, 'utf-8')

console.log('done')
