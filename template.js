function renderStatsHTML(stat) {
    return `
    <div class="d-flex stats great-first-letter">
        <span>${stat['stat']['name']}</span>
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${barWidth}" aria-valuemin="0" aria-valuemax="255">
            <div class="progress-bar" style="width: ${barWidth}%; --bs-progress-bar-bg: #${bgColor};">${stat['base_stat']}</div>
        </div>
    </div>`
}

function renderPokemonHTML() {
    return `
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
    </div>`
}

function renderOpenPokemonHTML() {
    return `
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
                    Types                   
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
    </div>`
}

function renderGeneralHTML() {
    return `
    <div class="general-stats">
        <div class="general-stat">
            <span>height</span><br>
            <div><b>${height} m</b></div>
        </div>
        <div class="general-stat">
            <span>weight</span><br>
            <div><b>${weight} kg</b></div>
        </div>
    </div>
    <div class="general-stats">
        <div class="general-stat">
            <span>abilities</span> <br>
            <div><b id="abilities">lädt...</b></div>
        </div>
    </div>`
}