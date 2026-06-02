import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'
import crypto from 'node:crypto'
import process from 'node:process'

process.loadEnvFile()
const port = process.env.PORT || 3000

function sendJsonResponse(res, data, statusCode = 200) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}

const users = [{
    id: crypto.randomUUID(),
    name: 'Alice'   
}, {
    id: crypto.randomUUID(),
    name: 'Bob'   
}]

const server = createServer(async (req, res) => {
	const { method, url } = req
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`)

    if (pathname === '/health') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json; charset=utf-8')

        const healthInfo = {
            status: 'ok',
            uptime: Math.floor(process.uptime()), 
            timestamp: Date.now(),
        }

        return res.end(JSON.stringify(healthInfo))
    }
	if (pathname) {
		if (method === 'GET') {
            const limit = searchParams.get('limit') || users.length
            const offset = searchParams.get('offset')
            let result = users
            if (limit) {
                result = result.slice(0, Number(limit))
            }
            if (offset) {
                result = result.slice(Number(offset))
            }
            return res.end(JSON.stringify(result))
		}

		if (method === 'POST') {
            // Lógica para crear un usuario
            try {
                const body = await json(req) // 👈 Lee el stream y lo convierte a objeto JSON
                const { name } = body
                if (!name) {
                    res.statusCode = 400
                    return res.end(JSON.stringify({ message: 'Name is required' }))
                }
                const newUser = {
                    id: crypto.randomUUID(), // 👈 Genera un ID tipo "550e8400-e29b-41d4-a716-446655440000"
                    name,
                }
                users.push(newUser) 
                res.statusCode = 201
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify(newUser))
            } catch (error) {
                res.statusCode = 400
                return res.end(JSON.stringify({ message: 'Invalid JSON' }))
            }
		}

		// Si el método no es soportado para esta ruta
		res.statusCode = 405
		return res.end(JSON.stringify({ message: 'Method Not Allowed' }))
	}
})

server.listen(port, () => {
    const adress = server.address()
    const port = typeof adress === 'string' ? adress : adress.port
    console.log(`Server running at http://localhost:${port}/`)
})