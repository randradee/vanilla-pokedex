const list = document.getElementById("pokemon-list")
const offset = 0;
const limit = 10;

function convertPokemonTypesToLi (pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

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
        <li class="pokemon">
            <span class="number">#${fixDisplayPokemonNumber(pokemon.order)}</span>
            <span class="name">${captalizeFirstLetter(pokemon.name)}</span>

            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join('')}
                </ol>

                <img 
                    src="${pokemon.sprites.other.dream_world.front_default}" 
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