import { useId, useState, useRef } from 'react'
import { useSearchForm } from '../hooks/useSearchForm'

function SearchForm({ onSearch, onTextFilter, hasActiveFilters, onClearFilters }) {
    const [focusedField, setFocusedField] = useState(null)
    const searchInputId = useId();
    const input = useRef(null);
    const searchTech = useId();
    const searchModalidad = useId();
    const searchNivel = useId();
    const {
        handleSubmit, 
        handleTextChange, 
        handleFilterChange,
        handleClearFilters
    } = useSearchForm({ searchInputId, searchTech, searchModalidad, searchNivel, onSearch, onTextFilter, onClearFilters });

    return (
        <section className="jobs-search">
            <h1>Encuentra tu próximo trabajo</h1>
            <p>Busca empleos de desarrolladores en las mejores empresas del mundo.</p>
            <form role="search" onChange={handleSubmit}>
                <div className={`search-bar ${focusedField === 'searchText' ? ' input-focused' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                    <input id={searchInputId} name={searchInputId} type="text"
                        ref={input}
                        placeholder="Buscar empleos por título, habilidad o empresa" 
                        onChange={handleTextChange}
                        onFocus={() => setFocusedField('searchText')}
                        onBlur={() => setFocusedField(null)}
                    />
                </div>
                <div className="search-filter">
                    <select id="technology" name={searchTech} 
                        onChange={handleFilterChange} 
                        onFocus={() => setFocusedField('technology')}
                        onBlur={() => setFocusedField(null)}
                        className={focusedField === 'technology' ? 'input-focused' : ''}
                    >
                        <option value="">Tecnología</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="mobile">Mobile</option>
                        <option value="node">Node</option>
                        <option value="react">React</option>
                    </select>
                    <select id="modalidad" name={searchModalidad} onChange={handleFilterChange}
                        onFocus={() => setFocusedField('modalidad')}
                        onBlur={() => setFocusedField(null)}
                        className={focusedField === 'modalidad' ? 'input-focused' : ''}
                    >
                        <option value="">Modalidad</option>
                        <option value="remoto">Remoto</option>
                        <option value="presencial">Presencial</option>
                        <option value="hibrido">Híbrido</option>
                    </select>
                    <select id="nivel" name={searchNivel} onChange={handleFilterChange}
                        onFocus={() => setFocusedField('nivel')}
                        onBlur={() => setFocusedField(null)}
                        className={focusedField === 'nivel' ? 'input-focused' : ''}
                    >
                        <option value="">Nivel</option>
                        <option value="junior">Junior</option>
                        <option value="mid-level">Mid-level</option>
                        <option value="senior">Senior</option>
                    </select>
                    <p id="filter-selected-value" style={{ marginTop: '1rem', color: 'var(--primary-light)' }}></p>
                </div>
                <div className="search-actions">
                    <button type="button" onClick={ (e) => {
                            e.preventDefault();
                            input.current.value = '';
                            handleClearFilters();
                        }
                    } disabled={!hasActiveFilters} style={{ marginTop: '1rem' }}>Limpiar filtros</button>
                </div>
            </form>
        </section>
    )
}
export default SearchForm