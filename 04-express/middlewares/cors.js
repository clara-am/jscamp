import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  'http://localhost:5173'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => { // Función que devuelve el middleware de CORS configurado con los orígenes aceptados
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true) // Permitir la solicitud (origen permitido o solicitud sin origen, como las de Bruno)
      }
  
      return callback(new Error('Origen no permitido'))
    }
  })
}