import { createContext, use, useState } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext() // Contexto para manejar la autenticación de usuario; comparte información sobre si el usuario está logueado y funciones para iniciar/cerrar sesión entre componentes (propdrilling)

export function AuthProvider ({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const login = () => {
        setIsLoggedIn(true)
    }
    
    const logout = () => {
        setIsLoggedIn(false)
    }
    
    const value = {
        isLoggedIn,
        login,
        logout
    }
    
    return <AuthContext value={value}>{children}</AuthContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() { // Custom hook para consumir el contexto de autenticación
    const context = use(AuthContext)
    
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    
    return context
}