import { NavLink } from 'react-router'
//import { useAuth } from '../context/AuthContext.jsx'
import { useAuthStore } from '../store/authStore'
import { useFavoritesStore } from '../store/useFavoritesStore'

const HeaderUserBtn = () => {
    const { isLoggedIn, login, logout } = useAuthStore();
    const { clearFavorites } = useFavoritesStore();
    const handleLogout = () => {
        logout()
        clearFavorites()
    }
    return (
        <>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Cerrar sesión</button>
            ) : (
                <button onClick={login}>Iniciar sesión</button>
            )}
        </>
    )
}   
function Header() {
    const { isLoggedIn } = useAuthStore()
    const { favoritesCount } = useFavoritesStore()
    const numberOfFavorites = favoritesCount()
    return (
        <header>
            <h1>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                DevJobs
            </h1>
            <nav>
                <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : ''} to="/">Inicio</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : ''} to="/search">Empleos</NavLink>
                {
                    isLoggedIn && (
                    <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : ''} to="/profile">
                        Perfil ❤️ {numberOfFavorites}
                    </NavLink>
                    )
                }
                <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : ''} to="/about">Acerca</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : ''} to="/contact">Contacto</NavLink>
                <HeaderUserBtn />
            </nav>
        </header>
    )
}

export default Header