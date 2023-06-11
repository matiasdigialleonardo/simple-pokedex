import { getPokemonData } from "./src/data-fetcher.js";
import { updatePokemonInfo } from "./src/update.js";

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

init();
