import { useState } from 'react'
import { Link } from 'react-router'
import styles from './JobCard.module.css'
import { useFavoritesStore } from "../store/useFavoritesStore"
import { useAuthStore } from "../store/authStore"

function JobCardFavoriteButton ({ job }) {
    const { toggleFavorite, isFavorite } = useFavoritesStore()
    
    return (
        <button
        onClick={() => toggleFavorite(job)}
        aria-label={isFavorite(job.id) ? 'Borrar de favoritos' : 'Agregar a favoritos'}
        >
            {isFavorite(job.id) ? '❤️' : '🤍'}
        </button>
    )
}

function JobCardApplyButton ({ jobId }) {
    const [isApplied, setIsApplied] = useState(false)
    const { isLoggedIn } = useAuthStore()
    
    const buttonClasses = isApplied ? 'button-apply-job is-active' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'
    
    const handleApplyClick = () => {
        console.log('Aplicando al trabajo con id:', jobId)
        setIsApplied(true)
    }
    
    return (
        <button disabled={!isLoggedIn} className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
    )
}

export function JobCard({ job }) {
    const { titulo, empresa, ubicacion, descripcion, data } = job;
    return (
        <article className={styles.card}>
            <div>
                <div className={styles.header}>
                    <Link 
                        to={`/jobs/${job.id}`} className={styles.cardLink} 
                        aria-label={`Ver detalles de ${titulo} en ${empresa}`}>
                        <h3 className={styles.title}>{titulo}</h3>
                        {job.isNew && <span className={styles.badge}>Nuevo</span>}
                    </Link>
                </div>
                <div className={styles.meta}>
                    <p className={styles.company}>{empresa}</p>
                    <p className={styles.location}>{ubicacion}</p>
                    <p className={styles.description}>{descripcion}</p>
                </div>
                {data.technology && data.technology.length > 0 && (
                    <div className={styles.tags}>
                        {data.technology.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                        ))}
                    </div>
                )}
            </div>
        
            <div className={styles.actions}>
                <span className={styles.salary}>{job.salary || 'Salario a convenir'}</span>
                <JobCardApplyButton jobId={job.id} />
                <JobCardFavoriteButton job={job} />
            </div>
        </article>
    )
}

export default JobCard