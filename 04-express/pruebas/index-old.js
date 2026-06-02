import express from "express";

const PORT = 3000; 
const app = express();

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'DevJobs',
    location: 'Remote'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'DevJobs',
    location: 'Barcelona'
  }
]
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use((req, res, next) => { // Middleware para registrar cada solicitud
    const timeString = new Date().toISOString();
    console.log(`[${timeString}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
  return res.send(`<h1>Server is running on port ${PORT}</h1>`);
});

app.get('/health', (req, res) => {
    return res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/jobs', (req, res) => { // GET /jobs o GET /jobs?location=Barcelona
  const { location } = req.query
  if (location) {
    const filteredJobs = jobs.filter(
      job => job.location.toLowerCase() === location.toLowerCase()
    )
    return res.json(filteredJobs)
  }
  return res.json(jobs)
})

app.get('/jobs/:id/:location', (req, res) => { // GET /jobs/:id o /jobs/:id/:location
  const { id, location: locationParam } = req.params
  const { location: locationQuery } = req.query
  const location = locationParam || locationQuery
  const job = jobs.find(job => job.id === parseInt(id))
  if (!job) {
    return res.status(404).json({ error: 'Job not found' })
  }
  if (location && job.location.toLowerCase() !== location.toLowerCase()) {
    return res.status(404).json({ error: 'Job not found in that location' })
  }
  return res.json(job)
})
