import { useRouter } from '../hooks/useRouter'
export function Link ({ href, children, ...restProps }) {
    //Una Single Page Application (SPA) es una aplicación web que no recarga la página al navegar entre diferentes rutas. En su lugar, utiliza JavaScript para actualizar dinámicamente el contenido de la página, lo que permite una experiencia de usuario más fluida y rápida. Para lograr esto, es necesario interceptar los clics en los enlaces y manejar la navegación de manera programática sin recargar la página.
    //En este componente Link, se intercepta el evento de clic en el enlace, se previene la acción predeterminada (que sería recargar la página) y se utiliza la API de History para cambiar la URL sin recargar. Luego, se dispara un evento personalizado 'popstate' para notificar a la aplicación que la ruta ha cambiado, lo que permite que el enrutador de la aplicación actualice el contenido mostrado al usuario.
    // const handleClick = (event) => {
    //     event.preventDefault();
    //     window.history.pushState(null, '', href);
    //     const navEvent = new PopStateEvent('popstate');
    //     window.dispatchEvent(navEvent);
    // };
    // En lugar de manejar la navegación directamente en el componente Link, se puede utilizar un hook personalizado useRouter para encapsular la lógica de navegación y hacer que el componente Link sea más limpio y reutilizable.
    const { navigateTo } = useRouter();

    const handleClick = (event) => {
        event.preventDefault();
        navigateTo(href);
    };

    return (
        <a href={href} {...restProps} onClick={handleClick}>{children}</a>
    )
}