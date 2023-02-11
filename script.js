let currentPokemon;
let typeColor;
let pokemonList;
let pokemon;
let offset = 0;
let pokemonName;
let ready = true;

async function loadPokemonList() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`;
    let response = await fetch(url);
    pokemonList = await response.json();
} 

async function loadPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    findOutTypeColor();
    pokemonName = currentPokemon['name']
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
}

function renderPokemon() {
    pokemonName = currentPokemon['name']
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokedex').innerHTML += `
    <div onclick="openPokemon('${currentPokemon['name']}')" class="pokemonBox" style="background-color: #${typeColor}">
        <div class="titleBox">
            <h2>#${currentPokemon['id']}</h2> 
            <h2>${pokemonName}</h2>
        </div>
        <div class="pokemonImg">
            <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
    </div>`;
}

async function pokemonNumber() {
    await loadPokemonList();
    for(let i = 0; i < pokemonList['results'].length; i++){
        pokemon = pokemonList['results'][i]['name'];
        await loadPokemon(pokemon);
        renderPokemon();
    }
    console.log(offset);
    ready = true;
}

function findOutTypeColor() {
    let type = currentPokemon['types'][0]['type']['name'];
    let types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];
    let typeColors = ['429854', '5A5A77', '60CBD9', 'FBFB70', 'EA1369', 'ED623A', 'FD4E5B', '95B1C5', '8E688E', '27CA51', '6E491F', 'DAEFFA', 'CA98A7', '9B69D9', 'F81D8F', '8B3E1F', '42BD94', '85A8FF'];
    typeColor = '';

    for (let i = 0; i < types.length; i++) {
        if (type == types[i]) {
            typeColor = typeColors[i];
        }
    }
}

async function openPokemon(pokemon) {
    await loadPokemon(pokemon);
    //document.getElementById('selected-pokemon__background').style = '';
    document.getElementById('selected-pokemon').style = '';
    document.getElementById('pokedex').style = 'filter: blur(5px);';
    document.getElementById('selected-pokemon').innerHTML = `
        <div class="selection-background">
            <div class="selection-top">
                <div class="selection-title">
                    <h2>#${currentPokemon['id']}</h2> 
                    <h2>${pokemonName}</h2>
                </div>
                <div class="selection-Img">
                    <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
                </div>
            </div>
        </div>`

    
}

function closeSelection() {
    //document.getElementById('selected-pokemon__background').style = 'display: none';
    document.getElementById('selected-pokemon').style = 'display: none';
    document.getElementById('pokedex').style = '';
}

async function loadNext() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && ready) { {
        ready = false 
        offset = offset + 25;
        //limit= limit + 25;
        await pokemonNumber()
      }}
}

async function loadScroll() {
    if(ready) {
       await loadNext(); 
    }
}

window.onscroll = function() {loadNext()};

