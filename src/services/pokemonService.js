const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemons = () => fetch(ENDPOINT)
.then(response => response.json());

export {getPokemons};