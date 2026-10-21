// .jostraca/ is gitignored by default. Simulate a teammate who clones the repo
// (hand edit included) and regenerates with merge switched on.
import { appendFileSync, readFileSync, rmSync } from 'node:fs'
import { Jostraca, Project, File, Content } from 'jostraca'

rmSync('./out3', { recursive: true, force: true })
const jostraca = Jostraca({ existing: { txt: { write: true, merge: true } } })
const run = (body) => jostraca.generate({ folder: './out3' }, () => {
  Project({}, () => File({ name: 'config.sh' }, () => Content(body)))
})

await run('PORT=8080\nHOST=localhost\n')
appendFileSync('./out3/config.sh', 'DEBUG=1\n')       // committed hand edit
console.log('.jostraca/.gitignore:', JSON.stringify(readFileSync('./out3/.jostraca/.gitignore', 'utf8')))

rmSync('./out3/.jostraca', { recursive: true })      // what a fresh clone looks like

const res = await run('PORT=9090\nHOST=localhost\n')
console.log('files:', JSON.stringify(res.files))
console.log('--- out3/config.sh ---\n' + readFileSync('./out3/config.sh', 'utf8'))
