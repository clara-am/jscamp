import { createContext, use, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext()

export function FavoritesProvider ({ children }) {
    const [favorites, setFavorites] = useState([])
    const addFavorite = (job) => {
        setFavorites((prevFavorites) => [...prevFavorites, job])
    }
    const removeFavorite = (jobId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((job) => job.id !== jobId)
        )
    }
    const isFavorite = (jobId) => {
        return favorites.some((job) => job.id === jobId)
    }
    const toggleFavorite = (job) => {
        if (isFavorite(job.id)) {
            removeFavorite(job.id)
        } else {
            addFavorite(job)
        }
    }
    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite
    }
    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
    const context = use(FavoritesContext)
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}