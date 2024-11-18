"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', () => {
        fetch('superheroes.php')
            .then(response => response.text())  
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                const superheroListItems = tempDiv.querySelectorAll('li');

                let superheroesList = '';
                superheroListItems.forEach(item => {
                    superheroesList += item.textContent + '\n';  
                });

                alert('Superheroes:\n' + superheroesList);
            })
            .catch(error => {
                console.error('Error fetching superheroes:', error);
                alert('An error occurred while fetching superheroes.');
            });
    });
});