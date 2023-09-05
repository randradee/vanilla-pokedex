const pokeApi = {}


pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .catch(error => console.error("Erro na requisição", error))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}$limit=${limit}`

    return fetch(url)
        .then(response => response.json())
        .then(data => data.results)
        .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetails(pokemon)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch(error => console.error("Erro na requisição", error))
}