import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Sustituye al contexto de autenticación; maneja el estado de si el usuario está logueado y funciones para iniciar/cerrar sesión, pero con una API más simple y sin necesidad de envolver componentes con un provider (propdrilling)
export const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
)