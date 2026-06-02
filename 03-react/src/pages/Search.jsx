import { useEffect } from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import SearchForm from '../components/SearchForm'
import JobListings from '../components/JobListings'
import { Pagination } from '../components/Pagination'
import { useFilters } from '../hooks/useFilters'

function SearchPage() {
    const {
        isLoading,
        searchText,
        filters,
        currentPage,
        pagedResults,
        totalPages,
        total,
        handleSearch,
        handleTextFilter,
        hasActiveFilters,
        handleClearFilters,
        handlePageChange,
    } = useFilters();

    // Se ejecuta cada vez que cambia la página (al menos una vez), para hacer scroll al inicio de los resultados
    // Usa useEffect cuando necesites hacer algo que no puede ejecutarse durante el render porque afecta algo externo al componente.
    useEffect(() => {
        window.scrollTo(0, 0);
        //document.title = `Resultados ${total} - Página ${currentPage}`;
    }, [total, currentPage]);

    const searchFormKey = `${searchText}|${filters.technology}|${filters.location}|${filters.experienceLevel}`

    const title = total > 0 ? `Resultados ${total} - Página ${currentPage}` : 'Búsqueda de empleos para desarrolladores';
    // useEffect(() => {
    //     // Handler que se ejecuta cuando la ventana cambia de tamaño
    //     const handleResize = () => {
    //         console.log(window.innerWidth)
    //     }
    //     // Suscribirse al evento resize
    //     window.addEventListener('resize', handleResize)
    //     // Función de limpieza: desuscribirse cuando el componente se desmonte
    //     return () => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // }, [])

    return (
        <>  
            <title>{title}</title>

            <SearchForm
                key={searchFormKey}
                onSearch={handleSearch}
                onTextFilter={handleTextFilter}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters}
                initialSearchText={searchText}
                initialFilters={filters}
            />
            
            <section> 
                <header>
                    <h2>Resultados de la búsqueda</h2>
                </header>
                {isLoading ?
                    <div className='loading-container'>
                        <ClimbingBoxLoader
                            color="#21ac9c"
                            size={10}
                            />
                    </div>  : 
                    <JobListings jobsData={pagedResults} />
                }
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
        </>
    )
}

export default SearchPage
