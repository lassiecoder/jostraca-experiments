// A plain replace key is matched literally, anywhere, including inside other words.
import { readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { Jostraca, Project, File, Fragment } from 'jostraca'

rmSync('./out5', { recursive: true, force: true })
mkdirSync('./tpl', { recursive: true })
writeFileSync('./tpl/model.ts',
  'export class NAME {\n' +
  '  // Each NAME reads its own config file\n' +
  '  static url = process.env.SERVICE_URL\n' +
  '  static file = process.env.NAME_FILE ?? `${process.env.SERVICE_NAME}.json`\n' +
  '}\n')

await Jostraca().generate({ folder: './out5' }, () => {
  Project({}, () => File({ name: 'model.ts' }, () =>
    Fragment({ from: '../tpl/model.ts', replace: { NAME: 'Widget' } })))
})
console.log(readFileSync('./out5/model.ts', 'utf8'))
