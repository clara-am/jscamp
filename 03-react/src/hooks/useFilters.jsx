import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router' 

const RESULTS_PER_PAGE = 5

const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [currentPage, setCurrentPage] = useState(() => {
        const pageParam = searchParams.get('page')
        if (!pageParam) return 1
        const page = Number(pageParam)
        if (Number.isNaN(page) || page < 1) {
            return 1
        }
        return page
    })
    const [filters, setFilters] = useState(() => {
        return {
            technology: searchParams.get('technology') || '',
            location: searchParams.get('location') || '',
            experienceLevel: searchParams.get('experienceLevel') || ''
        }
    });
    const [searchText, setTextToFilter] = useState(() => searchParams.get('searchText') || '');

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
                const params = new URLSearchParams()
                if (searchText) {
                    params.append('text', searchText)
                }
                if (filters.technology) {
                    params.append('technology', filters.technology)
                }
                if (filters.location) {
                    params.append('location', filters.location)
                }
                if (filters.experienceLevel) {
                    params.append('experienceLevel', filters.experienceLevel)
                }

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', String(RESULTS_PER_PAGE))
                params.append('offset', String(offset))
                const queryParams = params.toString()
                const response = await fetch(`http://localhost:3000/jobs?${queryParams}`)

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
    }, [filters, searchText, currentPage])

    useEffect(() => {
        const nextParams = {
            ...(searchText ? { searchText } : {}),
            ...(filters.technology ? { technology: filters.technology } : {}),
            ...(filters.location ? { location: filters.location } : {}),
            ...(filters.experienceLevel ? { experienceLevel: filters.experienceLevel } : {}),
            ...(currentPage > 1 ? { page: String(currentPage) } : {}),
        }

        setSearchParams(nextParams)
    }, [filters, searchText, currentPage, setSearchParams])
    
    return {
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
    }
}

export { useFilters }