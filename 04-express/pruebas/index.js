import express from 'express'
import { corsMiddleware } from '../middlewares/cors.js'
import jobs from '../jobs.json' with { type: 'json' }
import { DEFAULTS } from '../config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(corsMiddleware())
app.use(express.json()) // Middleware imprescindible. Sin esto, req.body será undefined en las rutas POST/PATCH/PUT
app.get('/', (req, res) => {
  return res.send({ message: 'Hello World' })
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

// Opcional -> /acd o /abcd
app.get('/a{b}cd', (req, res) => {
  return res.send('abcd o acd')
})

// Comodín
app.get('/bb*bb', (req, res) => {
  return res.send('bb*bb')
})

// Rutas más largas que no sabes como terminan
app.get('/file/*filename', (req, res) => {
  return res.send('file/*')
})

// Usar Regex
app.get(/.*fly$/, (req, res) => {
  return res.send('Terminando en fly')
})
// Obtener todos los empleos:
app.get('/jobs', (req, res) => { // GET /jobs o GET /jobs?location=Barcelona
  const { location } = req.query
  if (location) {
    const filteredJobs = jobs.filter(
      job => job.ubicacion.toLowerCase() === location.toLowerCase()
    )
    return res.json(filteredJobs)
  }
  return res.json(jobs)
})

// Obtener un empleo por su ID:
app.get('/jobs/:id', (req, res) => {
  const { id } = req.params
  const job = jobs.find(job => job.id === id)

  if (!job) return res.status(404).json({ message: 'Empleo no encontrado' })
  return res.json(job)
})

app.post('/jobs', (req, res) => {
  // Extraemos los datos del body enviado por el cliente
  const { title, company, location } = req.body

  const newJob = {
    id: crypto.randomUUID(), // Generamos un ID único y seguro
    title,
    company,
    location
  }

  jobs.push(newJob)

  return res.status(201).json(newJob)
})

app.patch('/jobs/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const jobIndex = jobs.findIndex(job => job.id === id)
  
  if (jobIndex === -1) return res.status(404).json({ message: 'No existe' })

  // Actualizamos solo el campo title
  jobs[jobIndex] = {
    ...jobs[jobIndex],
    title
  }

  return res.json(jobs[jobIndex])
})

app.delete('/jobs/:id', (req, res) => {
  const { id } = req.params

  const jobIndex = jobs.findIndex(job => job.id === id)

  if (jobIndex === -1) {
    return res.status(404).json({ message: 'Empleo no encontrado' })
  }

  // Eliminamos el empleo sin reasignar el import
  jobs.splice(jobIndex, 1)

  // Respondemos con 204 (Éxito sin contenido)
  return res.status(204).send()
}) 

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})
