// After a conflict, nobody resolves it and the generator runs again unchanged.
import { writeFileSync, readFileSync, rmSync } from 'node:fs'
import { Jostraca, Project, File, Content } from 'jostraca'

rmSync('./out2', { recursive: true, force: true })
const jostraca = Jostraca({ existing: { txt: { write: true, merge: true } } })
const run = (body) => jostraca.generate({ folder: './out2' }, () => {
  Project({}, () => File({ name: 'config.sh' }, () => Content(body)))
})

await run('PORT=8080\nHOST=localhost\n')
writeFileSync('./out2/config.sh', 'PORT=3000\nHOST=localhost\n')
const r2 = await run('PORT=9090\nHOST=localhost\n')
console.log('run 2 conflicted:', JSON.stringify(r2.files.conflicted))

const r3 = await run('PORT=9090\nHOST=localhost\n')   // same generator output again
console.log('run 3 conflicted:', JSON.stringify(r3.files.conflicted))
console.log('run 3 files:', JSON.stringify(r3.files))
console.log('--- out2/config.sh ---\n' + readFileSync('./out2/config.sh', 'utf8'))
