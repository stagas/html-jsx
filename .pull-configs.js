const fs = require('fs')
const { pullConfigs } = require('pull-configs')

const local = __dirname + '/'
const remote = 'https://github.com/stagas/typescript-minimal-template/raw/main/'

const { assign, omit, sort, merge, replace } = pullConfigs(remote, local)

merge('package.json', (prev, next) => {
  prev.trustedDependencies ??= []
  prev.trustedDependencies = [
    ...new Set([...prev.trustedDependencies, ...(next.trustedDependencies ?? [])]),
  ].sort()
  // prev.types = next.types
  // prev.scripts = next.scripts
  // prev.files = next.files
  sort(assign(prev.devDependencies, next.devDependencies))
})
replace('.gitignore')
replace('.eslintrc.js')
// replace('.pull-configs.js')
replace('.swcrc')
replace('dprint.json')
replace('jest.config.js')
// replace('tsconfig.json')
// replace('tsconfig.dist.json')
replace('web-test-runner.config.js')
// merge('.vscode/settings.json')

const deprecated = [
  '.vscode',
  '.vscode/extensions.json',
  '.prettierrc',
  '.prettierignore',
  'vite.config.js',
]
deprecated.forEach(x => {
  try {
    fs.rmSync(x, { recursive: true })
    console.log('removed', x)
  } catch {}
})
