import { state } from './config.js'

const RESULTS_PER_PAGE = 3;

function getPageSlice(items, page) {
    const safePage = Math.max(1, page);
    const startIndex = (safePage - 1) * RESULTS_PER_PAGE;
    const endIndex = startIndex + RESULTS_PER_PAGE;

    return items.slice(startIndex, endIndex);
}

function toArray(value) {
    if (Array.isArray(value)) return value;

    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {}

        return value.includes(',') ? value.split(',') : [value];
    }

    return [];
}

function matchesModalidad(modalidad, filterValue) {
    const value = (modalidad || '').toLowerCase();
    const filter = (filterValue || '').toLowerCase();

    if (!filter) {
        return true;
    }

    if (filter === 'presencial') {
        return value !== 'remoto' && value !== 'hibrido';
    }

    return value === filter;
}

const addArticle = (job) => {
    const article = document.createElement('article')
    article.className = 'job-listing-card'
    const container = document.querySelector('.jobs-listings');
    article.dataset.modalidad = job.data.modalidad
    article.dataset.nivel = job.data.nivel
    article.dataset.technology = job.data.technology

    article.innerHTML = `<div>
        <h3>${job.titulo}</h3>
        <small>${job.empresa} | ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>`;
    
    container.appendChild(article);
};

const renderJobs = (jobsToShow) => {
    jobsToShow.forEach(job => {
        addArticle(job);
    });
};

export function getData(currentPage) {
    const container = document.querySelector('.jobs-listings');
    container.innerHTML = '';

    fetch("./data.json")
    .then(res => res.json())
    .then(jobs => {
        const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

        renderJobs(getPageSlice(jobs, currentPage));
        renderPagination(totalPages, currentPage, (nextPage) => {
            getData(nextPage);
        });
    });
}

export function fetchData(inputData) {
    const container = document.querySelector('.jobs-listings');
    const input = inputData?.toLowerCase().trim();
    // Si no hay input, mostrar todo
    if (input === '' || input === undefined) {
        getData(1);
        return;
    }
    fetch("./data.json")
        .then(res => res.json())
        .then(jobs => {
            let filtered = [];
            jobs.forEach(job => {
                const titulo = job.titulo?.toLowerCase() || '';
                const empresa = job.empresa?.toLowerCase() || '';
                const modalidad = job.data?.modalidad?.toLowerCase() || '';
                const nivel = job.data?.nivel?.toLowerCase() || '';
                const technologies = toArray(job.data?.technology || []);

                const match =
                    titulo.includes(input) ||
                    empresa.includes(input) ||
                    technologies.some(tech => tech.toLowerCase().includes(input)) ||
                    matchesModalidad(modalidad, input) ||
                    nivel.includes(input);

                if (match) {
                    filtered.push(job);
                }
            });
            
            if (filtered.length === 0) {
                container.innerHTML = '<p>No se encontraron ofertas que coincidan con los filtros seleccionados.</p>';
                renderPagination(0, 1, () => {});
                return;
            }
            const totalPages = Math.ceil(filtered.length / RESULTS_PER_PAGE);

            const renderFilteredPage = (page) => {
                container.innerHTML = '';
                renderJobs(getPageSlice(filtered, page));
                renderPagination(totalPages, page, renderFilteredPage);
            };

            renderFilteredPage(1);
        });
}

export function fetchFilterData(filters) {
    const container = document.querySelector('.jobs-listings');
    container.innerHTML = '';
    fetch('./data.json')
        .then((response) => response.json())
        .then((jobs) => {
            if (filters.every(filter => filter.value === '')) {
                getData(1);
                return;
            }

            const activeFilters = filters.filter(filter => filter.value !== '');

            const filtered = jobs.filter(job => {
                const technologies = toArray(job.data?.technology || []);
                const modalidad = job.data?.modalidad?.toLowerCase() || '';
                const nivel = job.data?.nivel?.toLowerCase() || '';

                return activeFilters.every(filter => {
                    const filterValue = filter.value.toLowerCase();

                    return (
                        (filter.name === 'technology' &&
                            technologies.some(tech => tech.toLowerCase().includes(filterValue))) ||

                        (filter.name === 'modalidad' && matchesModalidad(modalidad, filter.value)) ||

                        (filter.name === 'nivel' &&
                            nivel === filterValue)
                    );
                });
            });

            if (filtered.length === 0) {
                container.innerHTML = '<p>No se encontraron ofertas que coincidan con los filtros seleccionados.</p>';
                renderPagination(0, 1, () => {});
                return;
            }
            const totalPages = Math.ceil(filtered.length / RESULTS_PER_PAGE);

            const renderFilteredPage = (page) => {
                container.innerHTML = '';
                renderJobs(getPageSlice(filtered, page));
                renderPagination(totalPages, page, renderFilteredPage);
            };

            renderFilteredPage(1);
        })
        .catch((error) => {
            console.error('Error loading jobs:', error);
            container.innerHTML = '<p>No se pudieron cargar las ofertas.</p>';
        });
    };

function renderPagination(totalPages, currentPage, onPageChange) {
    const paginationContainer = document.querySelector(".pagination");

    if (!paginationContainer) {
        return;
    }

    paginationContainer.innerHTML = "";

    if (totalPages <= 1) {
        return;
    }

    const createButton = (text, onClick, isActive = false, width = "", page = null) => {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = text;

        if (page !== null) {
            a.dataset.page = String(page);
        }

        if (isActive) {
            a.classList.add("is-active");
        }

        if (width) {
            a.style.width = width;
        }

        a.addEventListener("click", (e) => {
            e.preventDefault();
            onClick(e);
        });

        return a;
    };

    const prev = createButton("‹", () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    });

    const first = createButton("Primera", () => {
        onPageChange(1);
    }, false, "5.5rem");

    paginationContainer.appendChild(prev);
    paginationContainer.appendChild(first);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createButton(i, (e) => {
            const pageFromClick = Number(e.currentTarget.dataset.page);
            onPageChange(pageFromClick);
        }, i === currentPage, "", i);

        paginationContainer.appendChild(pageButton);
    }

    const last = createButton("Última", () => {
        onPageChange(totalPages);
    }, false, "5.5rem");

    const next = createButton("›", () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    });

    paginationContainer.appendChild(last);
    paginationContainer.appendChild(next);
}
