import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import snarkdown from 'snarkdown'
import parse, { domToReact } from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { Link } from "../components/Link"
//import { useAuth } from '../context/AuthContext'
import { useAuthStore } from '../store/authStore'
//import { useFavorites } from '../context/FavContext'
import { useFavoritesStore } from '../store/useFavoritesStore'
import styles from './detail.module.css'

const JobSection = ({ titulo, content }) => {
    const html = snarkdown(content ?? '')
    const htmlWithCheckLists = html.replace(/<ul(\s+class="([^"]*)")?>/g, (_, classAttr, classes = '') => {
        if (!classAttr) {
            return '<ul class="check">'
        }

        const classList = classes.split(/\s+/).filter(Boolean)
        if (!classList.includes('check')) {
            classList.push('check')
        }

        return `<ul class="${classList.join(' ')}">`
    })
    const parsedContent = parse(htmlWithCheckLists, {
        replace(node) {
            if (node?.name !== 'li' || node?.parent?.name !== 'ul') {
                return undefined
            }

            const parentClassName = node.parent.attribs?.class ?? ''
            if (!parentClassName.split(/\s+/).includes('check')) {
                return undefined
            }

            return (
                <li>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />
                    <span>{domToReact(node.children)}</span>
                </li>
            )
        }
    })
    
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{titulo}</h2>
            <div className={`${styles.sectionContent} prose`}>
                {parsedContent}
            </div>
        </section>
    )
}

function DetailPageBreadCrumb ({ job }) {
    return (
        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <Link 
                    to="/search"
                    className={styles.breadcrumbButton}
                >
                    Empleos
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
            </nav>
        </div>
    )
}

function DetailPageHeader ({ job }) {
    return (
        <div className={styles.headerContent}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    {job.titulo}
                </h1>
                <p className={styles.meta}>
                    {job.empresa} · {job.ubicacion}
                </p>
            </header>
            <div className={styles.detailBtnContainer}>
                <DetailApplyButton />
                <DetailFavoriteButton job={job} />
            </div>
        </div>
    )
}

function DetailApplyButton () {
    const { isLoggedIn } = useAuthStore()
    
    return (
        <button disabled={!isLoggedIn} className={styles.applyButton}>
        {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
        </button>
    )
}

function DetailFavoriteButton ({ job }) {
    const store = useFavoritesStore()
    //const { isFavorite, toggleFavorite } = useFavoritesStore() para evitar renderizados innecesarios
    const { isFavorite, toggleFavorite } = store 

    return (
        <button
        onClick={() => toggleFavorite(job)}
        aria-label={isFavorite(job.id) ? 'Borrar de favoritos' : 'Agregar a favoritos'}
        >
            {isFavorite(job.id) ? '❤️' : '🤍'}
        </button>
    )
}

export default function JobDetail () {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        //fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`)
        fetch(`http://localhost:3000/jobs/${id}`)
        .then(response => {
            if (!response.ok) {
                navigate('/not-found')
                return null
            }
            
            return response.json()
        })
        .then(json => {
            if (!json) return
            setJob(json)
        })
        .catch(err => {
            setError(err.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [id, navigate])
    
    if (loading) {
        return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div className={styles.loading}>
                <p className={styles.loadingText}>Cargando...</p>
            </div>
        </div>
        )
    }
    
    if (error || !job) {
        return (
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>
                        Oferta no encontrada
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className={styles.errorButton}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            <article className="prose">
                <DetailPageBreadCrumb job={job} />
                <DetailPageHeader job={job} />

                <JobSection titulo="Descripción del puesto" content={job.content.description} />
                <JobSection titulo="Responsabilidades" content={job.content.responsibilities} />
                <JobSection titulo="Requisitos" content={job.content.requirements} />
                <JobSection titulo="Acerca de la empresa" content={job.content.about} />
            </article>
        </div>
    )
}