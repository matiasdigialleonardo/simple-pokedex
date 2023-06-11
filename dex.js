import { capitalizeFirstLetter } from "./src/utils.js";
import { getPokemonData } from "./src/data-fetcher.js";

let pokemonSelectorForm = document.getElementById("pokemon-selector-form");

pokemonSelectorForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const USER_CHOICE = pokemonSelectorForm.elements.userInput.value.toLowerCase();

  let pokemonData = await getPokemonData(USER_CHOICE);

  updatePokemonInfo(pokemonData);
})

async function init() {
  let pokemonData = await getPokemonData();
  updatePokemonInfo(pokemonData);
}

function createListElement(content) {
  const li = document.createElement("li");
  li.textContent = content;
  return li;
}

function getDiv(divId) {
  return document.getElementById(divId);
}

function updatePokemonInfo(pokemonData) {
  updateName(pokemonData.species.name);
  updatePicture(pokemonData.sprites.front_default);
  updateTypes(pokemonData.types);
  updateWeight(pokemonData.weight);
  updateStatsName(pokemonData.stats);
  updateStatsValue(pokemonData.stats);
  updateMoves(pokemonData.moves)
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

async function updateMoves(moves) {
    const filteredMoves = filterMoves(moves);

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
    let lvlTextContent = move.version_group_details[0].level_learned_at;

    let li = createListElement(lvlTextContent);
    levelUl.appendChild(li);
  });
}

function updateMovesName(moves) {
  const movesUl = document.getElementById("moveList")
  movesUl.innerHTML = '';

  moves.forEach(move => {
    let moveNameTextContent = move.move.name;

    let li = createListElement(moveNameTextContent);
    movesUl.appendChild(li);
  });
}

function updateStatsName(stats) {
  const statNameUl = document.getElementById("stat-name-list");
  statNameUl.innerHTML = '';

  stats.forEach(stat => {

    let statName = stat.stat.name;

    let li = createListElement(statName);
    statNameUl.appendChild(li);

  });
}

function updateStatsValue(stats) {

  const statValueUl = document.getElementById("stat-value-list");

  statValueUl.innerHTML = '';

  stats.forEach(stat => {

    let statValue = stat.base_stat;

    let li = createListElement(statValue);
    statValueUl.appendChild(li);
  });
}


init();
