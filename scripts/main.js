const list = document.getElementById("pokemon-list")
const loadMoreButton = document.getElementById("loadMore")
const limit = 8;
let offset = 0;
const maxRecords = 151;

function captalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function fixDisplayPokemonNumber (number) {
    if (parseInt(number) < 10){
        number = '00' + number;
    } else if (parseInt(number) >= 10 && parseInt(number) < 100){
        number = '0' + number;
    }
    return number;
}



function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map(pokemon => {
           return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${fixDisplayPokemonNumber(pokemon.number)}</span>
                <span class="name">${captalizeFirstLetter(pokemon.name)}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img 
                        src="${pokemon.photo}" 
                        alt="${captalizeFirstLetter(pokemon.name)}"
                    >
                </div>
            </li>
        `
        }).join('');
        list.innerHTML += newHtml;
    })
}


loadPokemonItems(offset, limit);


loadMoreButton.addEventListener("click", () => {
    offset += limit;
    
    const qtdRecords = offset + limit;

    if (qtdRecords >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
        
        return;

    } else {
        loadPokemonItems(offset, limit);
    }
})