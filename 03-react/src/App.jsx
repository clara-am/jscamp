import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const JobDetailPage = lazy(() => import('./pages/JobDetail.jsx'))
const ProfilePage = lazy(() => import('./pages/Profile.jsx'))
const RegisterPage = lazy(() => import('./pages/Register.jsx'))
const LoginPage = lazy(() => import('./pages/Login.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFound.jsx'))

function App() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<p>Cargando página...</p>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/profile" element={
                            <ProtectedRoute redirectTo="/login">
                                <ProfilePage />
                            </ProtectedRoute>
                        } />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/jobs/:id" element={<JobDetailPage />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />  
        </>
    )
}

export default App