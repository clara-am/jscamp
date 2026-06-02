import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'
//import { useRouter } from './hooks/useRouter'
import { Route } from './components/Route'
import { NotFoundRoute } from './components/NotFoundRouter' 

function App() {
    // El enrutamiento en una Single Page Application (SPA) se logra mediante la manipulación de la historia del navegador y la actualización dinámica del contenido sin recargar la página. En este código, se define un hook personalizado `useRouter` que utiliza el estado para mantener la ruta actual y un efecto para escuchar los cambios en la historia del navegador.
    // const { currentPath } = useRouter();

    return (
        <>
            <Header />
            <main>
                {/* {currentPath === '/' && <HomePage />}
                {currentPath === '/search' && <SearchPage />}
                {currentPath !== '/' && currentPath !== '/search' && <NotFound />} */}
                <Route path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                <NotFoundRoute validPaths={["/", "/search"]} />
            </main>
            <Footer />  
        </>
    )
}

export default App