import { useRef } from 'react'

export // Este componente se encarga de manejar el formulario de búsqueda y los filtros para encontrar trabajos.
function useSearchForm({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter, onClearFilters }) {
    const timeoutId = useRef(null)
    const sendFilters = (formElement) => {
        if (!formElement) return;
        const formData = new FormData(formElement);
        const filters = {
            searchText: formData.get(idText),
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experienceLevel: formData.get(idExperienceLevel)
        };
        onSearch(filters);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (event.target.name === idText) {
            return 
        }
        sendFilters(event.currentTarget);
    };

    const handleFilterChange = (event) => {
        sendFilters(event.currentTarget.form);
    };

    const handleTextChange = (event) => {
        event.preventDefault();
        const inputValue = event.target.value.trim();
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            onTextFilter(inputValue);
        }, 700)
    };

    const handleClearFilters = () => {
        onClearFilters();
    };

    return {
        handleSubmit,
        handleTextChange,
        handleFilterChange,
        handleClearFilters,
    };
}
