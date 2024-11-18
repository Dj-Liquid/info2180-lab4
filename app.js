document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('result');

    searchBtn.addEventListener('click', () => {
        let query = searchInput.value.trim();

        if (query === '') {
            query = null;  
        } else {
            query = query.replace(/<[^>]*>/g, '');  
        }

        fetch('superheroes.php')
            .then(response => response.text())  
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                const superheroListItems = tempDiv.querySelectorAll('li');

                if (query) {
                    const filteredList = Array.from(superheroListItems).filter(item => {
                        const alias = item.textContent.trim().toLowerCase();
                        return alias.toLowerCase().includes(query.toLowerCase());
                    });

                    if (filteredList.length === 1) {
                        const superhero = filteredList[0];
                        const superheroAlias = superhero.textContent.trim();

                        const superheroDetails = Array.from(superheroListItems).find(item => {
                            return item.textContent.trim().toLowerCase() === superheroAlias.toLowerCase();
                        });

                        if (superheroDetails) {
                            const superheroObj = {
                                alias: superheroAlias,
                                name: superheroDetails.getAttribute('data-name'),
                                biography: superheroDetails.getAttribute('data-biography')
                            };

                            resultDiv.innerHTML = `
                                <h3>${superheroObj.alias}</h3>
                                <h4>${'A.K.A. ' + superheroObj.name}</h4>
                                <p>${superheroObj.biography}</p>
                            `;
                        } else {
                            resultDiv.innerHTML = '<p>Superhero not found</p>';
                        }
                    } else if (filteredList.length === 0) {
                        resultDiv.innerHTML = '<p>Superhero not found</p>';
                    } else {
                        let superheroesList = '<ul>';
                        filteredList.forEach(item => {
                            superheroesList += `<li>${item.textContent.trim()}</li>`;
                        });
                        superheroesList += '</ul>';
                        resultDiv.innerHTML = superheroesList;
                    }
                } else {
                    let superheroesList = '<ul>';
                    superheroListItems.forEach(item => {
                        superheroesList += `<li>${item.textContent.trim()}</li>`;
                    });
                    superheroesList += '</ul>';
                    resultDiv.innerHTML = superheroesList;
                }
            })
            .catch(error => {
                console.error('Error fetching superheroes:', error);
                resultDiv.innerHTML = '<p>Error fetching superheroes. Please try again.</p>';
            });
    });
});
