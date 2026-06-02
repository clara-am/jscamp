import { useEffect, useState } from 'react'
import { useRouter } from './useRouter'
const RESULTS_PER_PAGE = 5

const useFilters = () => {
    const { navigateTo } = useRouter()

    const [currentPage, setCurrentPage] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        const pageParam = params.get('page')
        if (!pageParam) return 1
        const page = Number(pageParam)
        if (Number.isNaN(page) || page < 1) {
            return 1
        }
        return page
    })
    const [filters, setFilters] = useState(() => {
        try {
            const params = new URLSearchParams(window.location.search)
            const nextFilters = {
                technology: '',
                location: '',
                experienceLevel: ''
            }
            const technology = params.get('technology')
            if (technology) {
                nextFilters.technology = technology
            }
            const location = params.get('location') || params.get('type')
            if (location) {
                nextFilters.location = location
            }
            const experienceLevel = params.get('experienceLevel')
            if (experienceLevel) {
                nextFilters.experienceLevel = experienceLevel
            }
            if (nextFilters.technology !== '' || nextFilters.location !== '' || nextFilters.experienceLevel !== '') {
                return nextFilters
            }

            const savedFilters = localStorage.getItem('searchState');
            console.log('Saved filters from localStorage:', savedFilters);
            return savedFilters ? JSON.parse(savedFilters) : {
                technology: '',
                location: '',
                experienceLevel: '',
            };
        } catch (error) {
            console.error('Error parsing saved filters:', error);
            return {
                technology: '',
                location: '',
                experienceLevel: '',
            };
        }
    });
    const [searchText, setTextToFilter] = useState(() => {
        try {
            const params = new URLSearchParams(window.location.search)
            const searchText = params.get('searchText')
            if (searchText) {
                return searchText
            }
            const savedFilters = localStorage.getItem('searchState');
            return savedFilters ? JSON.parse(savedFilters).searchText : '';
        } catch (error) {
            console.error('Error parsing saved search term:', error);
            return '';
        }
    });

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const pagedResults = jobs;
    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);
    const hasActiveFilters = !!(filters.technology || filters.location || filters.experienceLevel || searchText);

    const handleClearFilters = () => {
        setFilters({
            technology: '',
            location: '',
            experienceLevel: '',
        })
        setTextToFilter('')
        setCurrentPage(1);
        localStorage.removeItem('searchState');
    }

    const handleSearch = (newFilters = {}) => {
        setFilters({
            technology: newFilters.technology ?? '',
            location: newFilters.location ?? '',
            experienceLevel: newFilters.experienceLevel ?? '',
        })
        setTextToFilter(newFilters.searchText ?? '')
        setCurrentPage(1)
    }
    const handleTextFilter = (text) => {
        setTextToFilter(text);
        setCurrentPage(1)
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }   
    
    useEffect(() => {
        async function fetchJobs() {
            try {
                setIsLoading(true);
                const params = new URLSearchParams();
                if (searchText) {
                    params.append('text', searchText)
                }
                if (filters.technology) {
                    params.append('technology', filters.technology)
                }
                if (filters.location) {
                    params.append('type', filters.location)
                }
                if (filters.experienceLevel) {
                    params.append('experienceLevel', filters.experienceLevel)
                }

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)
                const queryParams = params.toString()
                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()
                setJobs(json.data)
                setTotal(json.total)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            } finally {
                setIsLoading(false)
            }   
        }
        fetchJobs()
    }, [searchText, filters.technology, filters.location, filters.experienceLevel, currentPage])
    useEffect(() => {
        const json = JSON.stringify({
            searchText: searchText,
            technology: filters.technology,
            location: filters.location,
            experienceLevel: filters.experienceLevel
        })
        localStorage.setItem('searchState', json)
    }, [searchText, filters.technology, filters.location, filters.experienceLevel])

    useEffect(() => {
        const params = new URLSearchParams()
        if (searchText) {
            params.set('searchText', searchText)
        }
        if (filters.technology) {
            params.set('technology', filters.technology)
        }
        if (filters.location) {
            params.set('location', filters.location)
        }
        if (filters.experienceLevel) {
            params.set('experienceLevel', filters.experienceLevel)
        }
        if (currentPage > 1) {
            params.set('page', String(currentPage))
        }
        const paramsString = params.toString()
        const basePath = window.location.pathname

        const newUrl = paramsString ? `${basePath}?${paramsString}` : basePath

        navigateTo(newUrl)
    }, [filters, searchText, currentPage, navigateTo])
    
    return {
        isLoading,
        currentPage,
        pagedResults,
        totalPages,
        total,
        handleSearch,
        handleTextFilter,
        hasActiveFilters,
        handleClearFilters,
        handlePageChange,
    }
}

export { useFilters }


// import { useState } from 'react'
// import jobsData from '../assets/data.json'
// const RESULTS_PER_PAGE = 5

// function toArray(value) {
//     if (Array.isArray(value)) return value;
//     if (typeof value === 'string') {
//         return value.includes(',') ? value.split(',') : [value];
//     }
//     return [];
// }

// function matchesModalidad(modalidad, filterValue) {
//     const value = (modalidad || '').toLowerCase();
//     const filter = (filterValue || '').toLowerCase();
//     if (!filter) {
//         return true;
//     }
//     if (filter === 'presencial') {
//         return value !== 'remoto' && value !== 'hibrido';
//     }
//     return value === filter;
// }

// const useFilters = () => {
//     const [currentPage, setCurrentPage] = useState(1); 
//     const [filters, setFilters] = useState({
//         technology: '',
//         location: '',
//         experienceLevel: '',
//     })
//     const [searchText, setTextToFilter] = useState('')

//     // Filtrar los trabajos según el término de búsqueda y los filtros seleccionados
//     const jobsFilteredByFilters = jobsData.filter((job) => {
//         const technologies = toArray(job.data?.technology || []);
//         return (
//         (filters.technology === '' || technologies.includes(filters.technology)) &&
//         (filters.location === '' || job.data.modalidad === filters.location) &&
//         (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
//         )
//     })

//     const jobsWithFilter = searchText === '' ? jobsFilteredByFilters : jobsFilteredByFilters.filter(job => {
//         const title = job.titulo?.toLowerCase() || '';
//         const company = job.empresa?.toLowerCase() || '';
//         const modalidad = job.data?.modalidad?.toLowerCase() || '';
//         const technologies = toArray(job.data?.technology || []);
//         const nivel = job.data?.nivel?.toLowerCase() || '';
//         const searchTextLower = searchText.toLowerCase();

//         return (
//             title.includes(searchTextLower) ||
//             company.includes(searchTextLower) ||
//             technologies.some(tech => tech.toLowerCase().includes(searchTextLower)) ||
//             matchesModalidad(modalidad, searchTextLower) ||
//             nivel.includes(searchTextLower)
//         );
//     });

//     const pagedResults = jobsWithFilter.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);
//     const totalPages = Math.ceil(jobsWithFilter.length / RESULTS_PER_PAGE);

//     const handlePageChange = (page) => {
//         setCurrentPage(page)
//     }
//     const handleSearch = (newFilters) => {
//         setFilters({
//             technology: newFilters.technology,
//             location: newFilters.location,
//             experienceLevel: newFilters.experienceLevel,
//         })
//         setTextToFilter(newFilters.searchText)
//     }
//     const handleTextFilter = (text) => {
//         setTextToFilter(text);
//         setCurrentPage(1);
//     }

//     return {
//         filters,
//         searchText, 
//         currentPage,
//         jobsWithFilter,
//         pagedResults,
//         totalPages,
//         handlePageChange,
//         handleSearch,
//         handleTextFilter,
//     }
// }