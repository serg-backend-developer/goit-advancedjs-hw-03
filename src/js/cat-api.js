import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_xsPdIcQ4lXjsq4mNpryV45ueamnlHMF2aLGbHj7OlVazX3SQLBIKS8UMV2mjG8XL';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(breedId) {
  const query = new URLSearchParams({ breed_ids: breedId });
  return axios.get(`https://api.thecatapi.com/v1/images/search?${query}`);
}

export { fetchBreeds, fetchCatByBreed };
