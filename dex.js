function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const CHOICE_BUTTON = document.getElementById("choice-button");
const INPUT_CHOICE = document.getElementById("user-input");

pokemonSelectorForm = document.getElementById("pokemon-selector-form");

pokemonSelectorForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const USER_CHOICE = pokemonSelectorForm.elements.userInput.value;
  console.log(USER_CHOICE);
  fetchPokemonInfo(USER_CHOICE);
  fetchPokemonMoves(USER_CHOICE);
})



/* 
fetch('https://pokeapi.co/api/v2/type/fire')
  .then(response => response.json())
  .then(data => {
    const typeSprites = data.sprites;
    console.log(typeSprites);
    // Use the typeSprites object as needed
  })
  .catch(error => {
    console.error('Error:', error);
  });
*/


async function getPokemonData(pokemon_name = 'bulbasaur') {
  try{
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
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

function getDiv(div_id) {
  return document.getElementById(div_id);
}


async function fetchPokemonMoves(pokemon_name = 'bulbasaur') {
    const pokemonData = await getPokemonData(pokemon_name)
    
    const levelUl = document.getElementById("levelList")
    const moveUl = document.getElementById("moveList")
    levelUl.innerHTML = '';
    moveUl.innerHTML = '';
    const moves = pokemonData.moves;
    const filteredMoves = moves
      .filter((move) => move.version_group_details[0].move_learn_method.name === "level-up")
      .sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at);

    filteredMoves.forEach(move => {
      lvlTextContent = move.version_group_details[0].level_learned_at;
      moveTextContent = move.move.name;

      createListElement(lvlTextContent, levelUl);
      createListElement(moveTextContent, moveUl);
    });
}


async function fetchPokemonInfo(pokemon_name) {

  const pokemonData = await getPokemonData(pokemon_name)

  const pokemonName = getDiv("pokemon-name");
  const pokemonPicture = document.getElementById("pokemon-picture");
  const pokemonType = getDiv("pokemon-type");
  const pokemonWeight = getDiv("pokemon-weight");

  pokemonType.innerHTML = '';

  pokemonName.textContent = capitalizeFirstLetter(pokemonData.species.name);
  pokemonPicture.src = pokemonData.sprites.front_default;
  pokemonData.types.forEach(type => {
    pokemonType.textContent += capitalizeFirstLetter(type.type.name) + " ";
  })
  pokemonWeight.textContent = pokemonData.weight;

}


fetchPokemonInfo();
fetchPokemonMoves();



/*
// Getting an image.
let image = document.createElement('img');
fetch('https://pokeapi.co/api/v2/pokemon/359')
  .then(response => response.json())
  .then(data => {
    // Process the response data
    image.src = data["sprites"].front_shiny;
    container.append(image);
  })
  .catch(error => {
    // Handle any errors that occurred during the API call
    console.error('Error:', error);
  });
*/


