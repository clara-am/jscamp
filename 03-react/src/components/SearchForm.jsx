import { useId, useState, useRef } from 'react'
import { useSearchForm } from '../hooks/useSearchForm'

function SearchForm({ onSearch, onTextFilter, hasActiveFilters, onClearFilters, initialSearchText = '', initialFilters = {} }) {
    const [focusedField, setFocusedField] = useState(null)
    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()
    const input = useRef(null);
    const {
        handleSubmit, 
        handleTextChange, 
        handleFilterChange,
        handleClearFilters
    } = useSearchForm({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter, onClearFilters });

    return (
        <section className="jobs-search">
            <h1>Encuentra tu próximo trabajo</h1>
            <p>Busca empleos de desarrolladores en las mejores empresas del mundo.</p>
            <form role="search" onSubmit={handleSubmit} onChange={handleSubmit}>
                <div className={`search-bar ${focusedField === 'searchText' ? ' input-focused' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                    <input 
                        type="text"
                        name={idText} 
                        defaultValue={initialSearchText}
                        ref={input}
                        placeholder="Buscar empleos por título, habilidad o empresa" 
                        onChange={handleTextChange}
                        onFocus={() => setFocusedField('searchText')}
                        onBlur={() => setFocusedField(null)}
                    />
                </div>
                <div className="search-filter">
                    <select 
                        name={idTechnology} 
                        defaultValue={initialFilters.technology || ''}
                        onChange={handleFilterChange} 
                        onFocus={() => setFocusedField('technology')}
                        onBlur={() => setFocusedField(null)}
                        className={focusedField === 'technology' ? 'input-focused' : ''}
                    >
                        <option value="">Tecnología</option>
                        <optgroup label="Tecnologías populares">
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="react">React</option>
                            <option value="nodejs">Node.js</option>
                        </optgroup>
                        <option value="java">Java</option>
                        <hr />
                        <option value="csharp">C#</option>
                        <option value="c">C</option>
                        <option value="c++">C++</option>
                        <hr />
                        <option value="ruby">Ruby</option>
                        <option value="php">PHP</option>
                    </select>
                    <select id="modalidad" name={idLocation} onChange={handleFilterChange}
                        defaultValue={initialFilters.location || ''}
                        onFocus={() => setFocusedField('modalidad')}
                        onBlur={() => setFocusedField(null)}
                        className={focusedField === 'modalidad' ? 'input-focused' : ''}
                    >
                        <option value="">Modalidad</option>
                        <option value="remoto">Remoto</option>
                        <option value="presencial">Presencial</option>
                        <option value="hibrido">Híbrido</option>
                    </select>
                    <select id="nivel" name={idExperienceLevel} onChange={handleFilterChange}
                        defaultValue={initialFilters.experienceLevel || ''}
                        onFocus={() => setFocusedField('nivel')}
                        onBlur={() => setFocusedField(null)}
                        className={focusedField === 'nivel' ? 'input-focused' : ''}
                    >
                        <option value="">Nivel</option>
                        <option value="junior">Junior</option>
                        <option value="mid">Mid-level</option>
                        <option value="senior">Senior</option>
                        <option value="lead">Lead</option>
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