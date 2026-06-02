import './devjobs-element.js'

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
    sessionStorage.setItem('jobSearch', inputValue);
    window.location.href = './empleos.html';
});