export async function getPokemonData(pokemonName = 'bulbasaur') {
    try{
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = await pokemonResponse.json();
      
      return pokemonData;
      } catch(error) {
        console.error('Error:', error);
      }
  }