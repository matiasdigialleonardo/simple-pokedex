//import { capitalizeFirstLetter } from "/src/utilities.js";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


pokemonSelectorForm = document.getElementById("pokemon-selector-form");

pokemonSelectorForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const USER_CHOICE = pokemonSelectorForm.elements.userInput.value.toLowerCase();

  fetchPokemonInfo(USER_CHOICE);
  fetchPokemonMoves(USER_CHOICE);
  fetchPokemonStats(USER_CHOICE);
})

async function getPokemonData(pokemonName = 'bulbasaur') {
  try{
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await pokemonResponse.json();
    
    return pokemonData;
    } catch(error) {
      console.error('Error:', error);
    }
}

function createListElement(content, parentElement) {
  const li = document.createElement("li");
  li.textContent = content;
  parentElement.appendChild(li);
}

function getDiv(divId) {
  return document.getElementById(divId);
}

async function fetchPokemonInfo(pokemonName) {

  const pokemonData = await getPokemonData(pokemonName)

  updateName(pokemonData.species.name);
  updatePicture(pokemonData.sprites.front_default);
  updateTypes(pokemonData.types);
  updateWeight(pokemonData.weight);
}

function updateName(name) {
  const nameElement = getDiv("pokemon-name");
  nameElement.textContent = capitalizeFirstLetter(name);
}

function updatePicture(pictureUrl) {
  const pictureElement = document.getElementById("pokemon-picture");
  // Set the source of the pokemon-picture img element to the picture url passed to the function.
  pictureElement.src = pictureUrl;
}

function updateTypes(types) {
  const typeElement = getDiv("pokemon-type");
  typeElement.textContent = "Type: ";
  // for each type in the types array.
  types.forEach(type => {
    // Capitalize the first letter of the type name.
    const capitalizedType = capitalizeFirstLetter(type.type.name);
    // Add the type name to the type element.
    typeElement.textContent += capitalizedType + " ";
  })
}

function updateWeight(weight) {
  const weightElement = getDiv("pokemon-weight");
  weightElement.textContent = "Weight: ";
  weightElement.textContent += weight;
}

async function fetchPokemonMoves(pokemonName = 'bulbasaur') {
    const pokemonData = await getPokemonData(pokemonName)
    
    const filteredMoves = filterMoves(pokemonData.moves);

    updateMovesLevel(filteredMoves);
    updateMovesName(filteredMoves);
}

function filterMoves(moves) {

    
  const filteredMoves = moves
    // Gets the moves from the first version only if their learn method is "level-up";
    .filter((move) => move.version_group_details[0].move_learn_method.name === "level-up")
    // Sorts the moves based on the level they are learned at in ascending order.
    .sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at);

  return filteredMoves;
}

function updateMovesLevel(moves) {
  const levelUl = document.getElementById("levelList")
  levelUl.innerHTML = '';

  moves.forEach(move => {
    lvlTextContent = move.version_group_details[0].level_learned_at;

    createListElement(lvlTextContent, levelUl);
  });
}

function updateMovesName(moves) {
  const movesUl = document.getElementById("moveList")
  movesUl.innerHTML = '';

  moves.forEach(move => {
    moveNameTextContent = move.move.name;

    createListElement(moveNameTextContent, movesUl);
  });
}

async function fetchPokemonStats(pokemonName = "bulbasaur") {
  const pokemonData = await getPokemonData(pokemonName);

  updateStats(pokemonData.stats);
}

function updateStats(stats) {
  const statNameUl = document.getElementById("stat-name-list");
  const statValueUl = document.getElementById("stat-value-list");
  statNameUl.innerHTML = '';
  statValueUl.innerHTML = '';

  stats.forEach(stat => {

    statName = stat.stat.name;
    statValue = stat.base_stat;

    createListElement(statName, statNameUl);
    createListElement(statValue, statValueUl);

  });
}




fetchPokemonInfo();
fetchPokemonMoves();
fetchPokemonStats();
