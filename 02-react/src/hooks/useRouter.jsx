import { useEffect, useState } from 'react'

export function useRouter () {
    const [currentPath, setCurrent] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setCurrent(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    function navigateTo(url) {
        window.history.pushState(null, null, url);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    return { currentPath, navigateTo };
}