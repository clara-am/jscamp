import JobCard from './JobCard'

export function JobListings({ jobsData }) {
    return (
        <div className="jobs-listings">
            {jobsData.length === 0 ? (
                <p style={{
                        padding: '2rem',
                        textWrap: 'balance',
                    }}
                    >
                    No se han encontrado empleos que coincidan con los criterios de búsqueda.
                </p>
            ) : (
                <>
                    {jobsData.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </>
            )}
        </div>
    )
}

export default JobListings