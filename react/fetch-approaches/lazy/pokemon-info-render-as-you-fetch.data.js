// http://localhost:3000/isolated/examples/fetch-approaches/lazy/pokemon-info-render-as-you-fetch.data.js

import { createResource, preloadImage } from '../../../utils';
import { fetchPokemon, getImageUrlForPokemon } from '../../../pokemon'; // helpers

function createPokemonResource(pokemonName) {
  // you get data like {id: '1', name: "pikachu", image: 'https://....'}
  const data = createResource(fetchPokemon(pokemonName));
  // immidiately fetch image after we have info about it (see code below)
  const image = createResource(
    preloadImage(getImageUrlForPokemon(pokemonName))
  );
  return { data, image };
}

// image preloading is similar to this one
// function preloadImage(src) {
//   return new Promise(resolve => {
//     const img = document.createElement('img')
//     img.src = src
//     img.onload = () => resolve(src)
//   })
// }

export default createPokemonResource;
