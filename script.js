let currentPokemon;
let id;
let typeColor;
let pokemonList;
let pokemon;
let offset = 0;
let pokemonName;
let ready = true;
let barWidth;


async function loadPokemonList() {       //load list from all pokemons from API
    let url = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`;
    let response = await fetch(url);
    pokemonList = await response.json();
} 

async function loadPokemon(pokemon) {  //load the pokemon with name from API
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    findOutTypeColor(currentPokemon['types'][0]['type']['name'], 'background');
    pokemonName = currentPokemon['name'];
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
}

function renderPokemon() {      //render the pokemoncard
    pokemonName = currentPokemon['name'];
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokedex').innerHTML += `
    <div onclick="openPokemon('${currentPokemon['name']}')" class="pokemonBox" style="background-color: #${typeColor}">
        <div class="titleBox">
            <h2>${pokemonName}</h2>
            <span>#${id}</span> 
        </div>
        <div class="pokemonImg">
            <img class="pokeball" src="./img/pokeball.svg"> 
            <img class="pokemon" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
        <div class="d-flex justify-content-center gap-1" id="types${currentPokemon['id']}">

        </div>
    </div>`;
    
}

function renderTypes(id) {      //render TypeButtons in the div with 'id' 
    let index = document.getElementById(id);
    let types = currentPokemon['types'];


    for (let i = 0; i < types.length; i++) {
        let type = types[i]['type']['name']
        findOutTypeColor(type, 'buttons')
        type = type[0].toUpperCase() + type.slice(1);
        index.innerHTML += `
        <div class="type-buttons" style="background-color: #${typeColor}">
            ${type}
        </div>`
    }
}

async function pokemonNumber() {        //startscript
    await loadPokemonList();
    for(let i = 0; i < pokemonList['results'].length; i++){
        pokemon = pokemonList['results'][i]['name'];
        await loadPokemon(pokemon);
        madeIdsgreater();
        renderPokemon();
        renderTypes('types' + currentPokemon['id']);
    }
    ready = true;
}

function findOutTypeColor(type, array) {        //find out background color for cards and buttons
    let types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];
    let buttons = ['A2CCAB', 'AEAEBC', 'B0E5EC', 'FDFDB9', 'F48AB5', 'F6B29E', 'FEA8AE', 'CBD8E2', 'C8B5C8', '94E5A9', 'B7A591', 'EDF7FC', 'E5CCD3', 'CEB5EC', 'FB8FC8', 'C6A091', 'A2DFCA', 'C3D4FF'];
    let background = ['429854', '5A5A77', '60CBD9', 'FBFB70', 'EA1369', 'ED623A', 'FD4E5B', '95B1C5', '8E688E', '27CA51', '6E491F', 'DAEFFA', 'CA98A7', '9B69D9', 'F81D8F', '8B3E1F', '42BD94', '85A8FF'];
    if (array == 'background') {
        colorPic = background;
    } else {
        colorPic = buttons;
    }
    for (let i = 0; i < types.length; i++) {
        if (type == types[i]) {
            typeColor = colorPic[i];
        }
    }
}

async function openPokemon(pokemon) {       //open the Pokemon details with click on the Card 
    await loadPokemon(pokemon);
    document.getElementById('selected-pokemon').style = '';
    document.getElementById('pokedex').style = 'filter: blur(5px);';
    document.getElementById('selected-pokemon').innerHTML = `
        <div class="selection-background">
            <div class="selection-top position-relative">
                <div class="selection-title">
                    <h2 class="margin-unset">${pokemonName}</h2>
                </div>
                <div class="selection-id margin-unset">
                    <h2>#${currentPokemon['id']}</h2> 
                </div>
                <div class="selection-Img">
                    <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
                    
                </div>
            </div>
            <div class="selection-bottom">
                <div id="stats">

                </div>
            </div>
        </div>`;
    renderStats()
}

function calcWidthBar(stat) {       // calculate the width from the stats bar
    barWidth = stat / 255 * 100;
}

function madeIdsgreater() {         // made the pokemonId´s longer 0001 and not 1
    id = currentPokemon['id'].toString();

    if (id.length < 4) {
        for(let i = 0; id.length < 4; i++) {
            id = 0 + id;
        }
    }
}

function renderStats() {        //render the pokemon stats
    let stats = currentPokemon['stats']
    let index = document.getElementById('stats');
    index.innerHTML = '';
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i]
        calcWidthBar(stat['base_stat'])
        console.log(stat['stat']['name'])
        index.innerHTML += `
        <div><span>${stat['stat']['name']}</span></div>
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${barWidth}" aria-valuemin="0" aria-valuemax="255">
            <div class="progress-bar" style="width: ${barWidth}%">${stat['base_stat']}</div>
        </div>`
    }
}

function closeSelection() {         //close the selected window
    document.getElementById('selected-pokemon').style = 'display: none';
    document.getElementById('pokedex').style = '';
}

async function loadNext() {         //load the next 25 pokemon on scroll to the end of the pokemon div
    let pokedex = document.getElementById('pokedex');
    if ((window.innerHeight + window.scrollY) >= pokedex.offsetHeight && ready) { {
        ready = false ;
        offset = offset + 25;
        await pokemonNumber();
      }}
}



window.onscroll = function() {loadNext()}; //load the loadNext function on scroll

