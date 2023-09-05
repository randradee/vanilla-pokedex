const list = document.getElementById("pokemon-list")
const offset = 0;
const limit = 100;

function captalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function fixDisplayPokemonNumber (number) {
    if (parseInt(number) < 10){
        number = '00' + number;
    } else if (parseInt(number) >= 10 || parseInt(number) < 100){
        number = '0' + number;
    }
    return number;
}

function convertPokemonToLi (pokemon) {
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
}


pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
    console.log(pokemonList)
    list.innerHTML += pokemonList.map(convertPokemonToLi).join('');
})