import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const dir = process.argv[2] || '.'

function formatSize(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

async function listFiles(directory) {
    try {
        const files = await readdir(directory) 
        for (const file of files) {
            const filePath = join(directory, file)
            const fileStat = await stat(filePath)
            console.log(`${file} - ${formatSize(fileStat.size)}`)
        }   
    } catch (error) {
        console.error('Error reading directory:', error)
    }
}

listFiles(dir)