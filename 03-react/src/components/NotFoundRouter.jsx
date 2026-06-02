import { NotFound } from '../pages/NotFound'
import { useRouter } from '../hooks/useRouter'

export function NotFoundRoute({ validPaths }) {
    const { currentPath } = useRouter();
    const isValidPath = validPaths.includes(currentPath);
    
    if (isValidPath) return null;
    return <NotFound />;
}