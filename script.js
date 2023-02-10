let currentPokemon;
let typeColor;


async function loadPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    findOutTypeColor()
    renderPokemon()

}

function renderPokemon() {
    let pokemonName = currentPokemon['name']
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokedex').innerHTML += `
    <div class="pokemonBox" style="background-color: #${typeColor}">
        <div class="titleBox">
            <h2>#${currentPokemon['id']}</h2> 
            <h2>${pokemonName}</h2>
        </div>
        <div class="pokemonImg">
            <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
    </div>` ;
}

async function pokemonNumber() {
    for(let i = 1; i < 152; i++){
        await loadPokemon(i);
    }
}

function findOutTypeColor() {
    let type = currentPokemon['types'][0]['type']['name'];
    let types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];
    let typeColors = ['429854', '5A5A77', '60CBD9', 'FBFB70', 'EA1369', 'ED623A', 'FD4E5B', '95B1C5', '8E688E', '27CA51', '6E491F', 'DAEFFA', 'CA98A7', '9B69D9', 'F81D8F', '8B3E1F', '42BD94', '85A8FF']
    typeColor = '';

    for (let i = 0; i < types.length; i++) {
        if (type == types[i]) {
            typeColor = typeColors[i]
        }
    }
}

