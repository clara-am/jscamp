import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
//import { AuthProvider } from './context/AuthContext'
//import { FavoritesProvider } from './context/FavContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* <AuthProvider> */}
            {/* <FavoritesProvider> */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            {/* </FavoritesProvider> */}
        {/* </AuthProvider> */}
    </StrictMode>,
)
