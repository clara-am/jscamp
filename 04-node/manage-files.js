import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

if (process.permission.has('fs.read', '/file.txt')) {
    console.log('✅ Tenemos permiso de lectura')
} else {
    console.error('❌ Error: No tenemos permiso para leer este archivo')
}

const content = await readFile('./file.txt', 'utf-8')
console.log(content)
await mkdir(join('output', 'files', 'documents'), { recursive: true })
const outputPath = join('output', 'files', 'documents', 'file.txt')
await writeFile(outputPath, 'Hello world!')  
console.log('File created successfully!', extname(outputPath), basename(outputPath)) 
