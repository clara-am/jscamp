import  {getData, fetchData, fetchFilterData} from  './fetch-data.js'
import './appy-button.js'
import './devjobs-element.js'

const selects = document.querySelectorAll('select');

selects?.forEach(select => {
    select?.addEventListener('change', () => {
        const values = Array.from(selects).map(s => { return { value: s.value, name: s.name } });
        fetchFilterData(values);
    });
});

let btnSearch = document.querySelector('#btnSearch');
let inputSearch = document.querySelector('#inputSearch');
inputSearch?.addEventListener('input', function (e) {
    e.preventDefault();
    const inputValue = e.currentTarget.value.trim();
    btnSearch?.toggleAttribute('disabled', inputValue === '');
});

btnSearch?.addEventListener('click', function (e) {
    e.preventDefault();
    const inputValue = inputSearch.value.trim().toLowerCase();
    fetchData(inputValue);
    inputSearch.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
    // Ejecutar búsqueda si viene de index.html
    const searchQuery = sessionStorage.getItem('jobSearch');

    if (searchQuery) {
        fetchData(searchQuery);
        sessionStorage.removeItem('jobSearch');
    } else {
        getData(1);
    }
});