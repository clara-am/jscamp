import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router'

export function useRouter() {
    const navigate = useNavigate()
    const location = useLocation()

    const navigateTo = useCallback((path) => {
        const currentUrl = `${location.pathname}${location.search}`
        if (path === currentUrl) {
            return
        }

        console.log('Navegando a:', path)
        navigate(path)
    }, [navigate, location.pathname, location.search])

    const goBack = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const currentPath = location.pathname

    return {
        currentPath,
        navigateTo,
        goBack,
        location,
    }
}