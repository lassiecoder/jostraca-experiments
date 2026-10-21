// A generator whose own output mentions JOSTRACA_PROTECT (e.g. docs telling
// users how to take a file over) locks that file against itself forever.
import { readFileSync, rmSync } from 'node:fs'
import { Jostraca, Project, File, Content } from 'jostraca'

rmSync('./out4', { recursive: true, force: true })
const jostraca = Jostraca()
const run = (version) => jostraca.generate({ folder: './out4' }, () => {
  Project({}, () => File({ name: 'CONTRIBUTING.md' }, () => Content(
    `# Contributing (generator v${version})\n\n` +
    `To stop regeneration of a file, add JOSTRACA_PROTECT to it.\n`)))
})

await run(1)
const res = await run(2)
console.log('files:', JSON.stringify(res.files))
console.log('--- out4/CONTRIBUTING.md ---\n' + readFileSync('./out4/CONTRIBUTING.md', 'utf8'))
