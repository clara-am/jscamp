import ButtonApply from '../ui/ButtonApply'

function JobCard({ job }) {
    const { titulo, empresa, ubicacion, descripcion, data } = job;
    return (
        <article
            className="job-listing-card"
            data-modalidad={data.modalidad}
            data-nivel={data.nivel}
            data-technology={data.technology}
            >
            <div>
                <h3>{titulo}</h3>
                <small>
                {empresa} | {ubicacion}
                </small>
                <p>{descripcion}</p>
            </div>
            <ButtonApply />
        </article>
    )
}
export default JobCard
