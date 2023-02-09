let currentPokemon;


async function loadPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    renderPokemon()
}

function renderPokemon() {
    document.getElementById('pokedex').innerHTML += `
    <div class="pokemonBox">
        <div class="titleBox">
            <h2>#${currentPokemon['id']}</h2> 
            <h2>${currentPokemon['name']}</h2>
        </div>
        <div class="pokemonImg">
            <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
    </div>` ;
}

function pokemonNumber() {
    for(let i = 1; i < 152; i++){
        loadPokemon(i);
    }
}