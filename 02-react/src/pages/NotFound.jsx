import { Link } from '../components/Link'
export function NotFound () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center' }}>
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>La página que buscas no existe.</p>
            <img src="https://midu.dev/images/this-is-fine-404.gif" width="300" alt="A dog wearing a hat sits calmly at a table holding a cup of coffee, surrounded by intense flames in a yellow environment, with a gray stormy sky above. The dog has a resigned, unfazed expression while everything around is burning. This represents the feeling of acceptance in chaotic situations."/>
            <Link href="/" className="btn" style={{ marginTop: '1rem' }}>Volver al inicio</Link>
        </div>
    )
}