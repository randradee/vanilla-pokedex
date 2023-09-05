const list = document.querySelector(".pokemon-list")
const basePokemonUrl = "https://pokeapi.co/api/v2/pokemon"


window.onload = () => {
    for (let i = 1; i <= 500 ; i++){
        fetch(`${basePokemonUrl}/${i}`)
            .then(response => {
                if (!response.ok){
                    throw new Error("Erro na requisição")
                }

                return response.json()
            })
            .then(data => {
                // criar elementos html
                const pokemon = document.createElement("li");
                pokemon.classList = "pokemon";
                const number = document.createElement("span");
                number.classList= "number";
                const name = document.createElement("span");
                number.classList= "name";
                const detail = document.createElement("div");
                detail.classList = "detail";
                const types = document.createElement("ol");
                types.classList = "types";

                let typesArr = [];
                for (let i = 1; i <= data.types.length; i++){
                    const type = document.createElement("li");
                    type.classList = "type";
                    type.innerHTML = data.types[0].type.name;
                    typesArr.push(type);
                }
                const img = document.createElement("img");

                // setar os atributos
                if (data.id < 10){
                    number.innerHTML = `#00${data.id}`;
                }
                if (data.id >= 10 || data.id < 100){
                    number.innerHTML = `#0${data.id}`;
                }
                if (data.id >= 100){
                    number.innerHTML = `#${data.id}`;
                }

                const pokemonName = data.forms[0].name;
                const pokemonNameFirstLetterUpperCase = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
                name.innerHTML = pokemonNameFirstLetterUpperCase;
                
                img.setAttribute("src", `${data.sprites.other.dream_world.front_default}`)


                // desenhar árvore no dom
                list.appendChild(pokemon);
                pokemon.appendChild(number);
                pokemon.appendChild(name);
                pokemon.appendChild(detail);
                detail.appendChild(types);
                for (let type of typesArr){
                    types.appendChild(type);
                }
                detail.appendChild(img);

            })
            .catch(error => {
                console.error("Erro na requisição", error)
            })
    }
}