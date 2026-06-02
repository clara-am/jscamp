// vite.config.js
import os from 'node:os'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const cacheRoot = process.env.LOCALAPPDATA ?? os.tmpdir()

export default defineConfig({
    cacheDir: path.join(cacheRoot, 'vite', '03-react'),
    plugins: [react()],
})
