// Generator and user both change the SAME line. What does merge do?
import { writeFileSync, readFileSync, rmSync } from 'node:fs'
import { Jostraca, Project, File, Content } from 'jostraca'

rmSync('./out1', { recursive: true, force: true })
const jostraca = Jostraca({ existing: { txt: { write: true, merge: true } } })
const run = (body) => jostraca.generate({ folder: './out1' }, () => {
  Project({}, () => File({ name: 'config.sh' }, () => Content(body)))
})

await run('PORT=8080\nHOST=localhost\n')
writeFileSync('./out1/config.sh', 'PORT=3000\nHOST=localhost\n')   // user edit
const res = await run('PORT=9090\nHOST=localhost\n')              // generator edit

console.log('conflicted:', JSON.stringify(res.files.conflicted))
console.log('merged:', JSON.stringify(res.files.merged))
console.log('--- out1/config.sh ---\n' + readFileSync('./out1/config.sh', 'utf8'))
