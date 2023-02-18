let currentPokemon;
let id;
let height;
let weight;
let bgColor;
let btnColor;
let pokemonList;
let pokemon;
let offset = 0;
let pokemonName;
let ready = true;
let barWidth;
let pokemons = [];



async function loadPokemonList() {       //load list from all pokemons from API
    let url = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`;
    let response = await fetch(url);
    pokemonList = await response.json();
} 

async function loadPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    let response = await fetch(url);
    let pokemonsList = await response.json();
    pokemons = [];
    for (let i = 0; i < pokemonsList['results'].length; i++){
        let selectedPokemon = pokemonsList['results'][i];
        pokemons.push(selectedPokemon['name'])
    }
    
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
    madeIdsgreater('id', 4);
    pokemonName = currentPokemon['name'];
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokedex').innerHTML += `
    <div onclick="openPokemon('${currentPokemon['name']}')" class="pokemonBox" style="background-color: #${bgColor}">
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
        let type = types[i]['type']['name'];
        findOutTypeColor(type, 'buttons');
        type = type[0].toUpperCase() + type.slice(1);
        index.innerHTML += `
        <div class="type-buttons" style="background-color: #${btnColor}">
            ${type}
        </div>`
    }
}

async function pokemonNumber() {        //startscript
    await loadPokemonList();
    loadPokemons();
    for(let i = 0; i < pokemonList['results'].length; i++){
        pokemon = pokemonList['results'][i]['name'];
        await loadPokemon(pokemon);
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
        for (let i = 0; i < types.length; i++) {
            if (type == types[i]) {
                bgColor = background[i]; 
            }
        };
    } else {
        for (let i = 0; i < types.length; i++) {
            if (type == types[i]) {
                btnColor = buttons[i]; 
            }
        };
    };


}

async function openPokemon(pokemon) {       //open the Pokemon details with click on the Card 
    await loadPokemon(pokemon);
    madeIdsgreater('id', 4);
    findOutTypeColor(currentPokemon['types'][0]['type']['name'], 'buttons')
    document.getElementById('selected-pokemon').style = '';
    document.getElementById('pokedex').style = 'filter: blur(5px);';
    document.getElementById('selected-pokemon').innerHTML = `
        <div class="selection-background">
            <img class="mobile-btn" onclick="closeSelection()" src="./img/exitbtn.svg">
            <div class="selection-top position-relative" style="background-color: #${bgColor};">
                
                <div class="selection-Img">
                    <img class="selection-pokeball" src="./img/pokeball.svg">
                    <img class="pokemon" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">    
                </div>
                <div class="selection-title" style="background-color: #${btnColor};">
                    <h2 class="margin-unset">${pokemonName}</h2>
                    <span>#${id}</span> 
                </div>

            </div>
            <div class="selection-bottom">
                <div class="d-flex nav">
                    <div id="generalBtn" onclick="renderGeneral()" class="nav-btn">
                        General                   
                    </div>
                    <div id="notGeneralBtn" onclick="renderNotGeneral()" class="nav-btn inactive-btn">
                        General                   
                    </div>
                </div>
                <div id="general">
                </div>
                <div id="stats">
                    <div class="d-flex justify-content-center stats-title">
                        Species specific strengths
                    </div>
                    <div id="statsImport">
                    </div>
                </div>
            </div>
        </div>`;
    renderStats();
    renderGeneral();
}

function renderGeneral() {
    document.getElementById('generalBtn').classList.remove('inactive-btn');
    document.getElementById('notGeneralBtn').classList.add('inactive-btn');
    madeIdsgreater('height', 2);
    madeIdsgreater('weight', 2);
    height = [height.slice(0, -1), ',', height.slice(-1)].join('');
    weight = [weight.slice(0, -1), ',', weight.slice(-1)].join('');
    document.getElementById('general').innerHTML = `
        <div class="general-stats">
            <div class="general-stat">
                <span>height</span><br>
                <div><b>${height} m</b></div>
            </div>
            <div class="general-stat">
                <span>class</span><br>
                <div><b>Samen</b></div>
            </div>
        </div>
        <div class="general-stats">
            <div class="general-stat">
                <span>weight</span><br>
                <div><b>${weight} kg</b></div>
            </div>
            <div class="general-stat">
                <span>abilities</span> <br>
                <div><b id="abilities">lädt...</b></div>
            </div>
        </div>`
        renderAbilities();
}

function renderNotGeneral() {
    document.getElementById('generalBtn').classList.add('inactive-btn');
    document.getElementById('notGeneralBtn').classList.remove('inactive-btn');
    document.getElementById('general').innerHTML = ``;
}

function renderAbilities() {    
    let abilities = currentPokemon['abilities']
    let index = document.getElementById('abilities');
    index.innerHTML =''
    for(let i = 0; i < abilities.length; i++) {
        let ability = abilities[i]['ability']['name'];
        index.innerHTML += `<div>${ability}</div>`;
    }
}

function calcWidthBar(stat) {       // calculate the width from the stats bar
    barWidth = stat / 255 * 100;
}

function madeIdsgreater(ids, wishLength) {         // made the pokemonId´s longer 0001 and not 1    
    if (ids == 'id') {
        id = currentPokemon['id'].toString();
        if (id.length < wishLength) {
            for(let i = 0; id.length < wishLength; i++) {
                id = 0 + id;
            }
        }
    }
    if (ids == 'height') {
        height = currentPokemon['height'].toString();
        if (height.length < wishLength) {
            for(let i = 0; height.length < wishLength; i++) {
                height = 0 + height;
            }
        }
    }
    if (ids == 'weight') {
        weight = currentPokemon['weight'].toString();
        if (weight.length < wishLength) {
            for(let i = 0; weight.length < wishLength; i++) {
                weight = 0 + weight;
            }
        }
    }

}

function renderStats() {        //render the pokemon stats
    let stats = currentPokemon['stats']
    let index = document.getElementById('statsImport');
    index.innerHTML = ``;
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i]
        calcWidthBar(stat['base_stat'])
        index.innerHTML += `
        <div class="d-flex stats great-first-letter">
            <span>${stat['stat']['name']}</span>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${barWidth}" aria-valuemin="0" aria-valuemax="255">
                <div class="progress-bar" style="width: ${barWidth}%; --bs-progress-bar-bg: #${bgColor};">${stat['base_stat']}</div>
            </div>
        </div>`
    }
}

function closeSelection() {         //close the selected window
    document.getElementById('selected-pokemon').style = 'display: none';
    document.getElementById('pokedex').style = '';
}

async function searchbar() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase(); 
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML =''
    if(input != ''){
        for (let i = 0; i < pokemons.length; i++) {
            let pokemonCurrent = pokemons[i];
            if (pokemonCurrent.includes(input)) {
                await loadPokemon(pokemonCurrent);
                renderPokemon();
            }
        }
    } else {
        pokemonNumber()
    }
        
    
   
}

async function loadNext() {         //load the next 25 pokemon on scroll to the end of the pokemon div
    let input = document.getElementById('searchbar').value;
    let pokedex = document.getElementById('pokedex');
    if ((window.innerHeight + window.scrollY) >= pokedex.offsetHeight && ready && !input) { {
        ready = false ;
        offset = offset + 25;
        await pokemonNumber();
      }}
}



window.onscroll = function() {loadNext()}; //load the loadNext function on scroll

