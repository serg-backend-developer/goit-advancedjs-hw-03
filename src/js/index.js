import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

import 'modern-normalize/modern-normalize.css';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/styles.css';

const elements = {
  breedsList: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  catInfo: document.querySelector('div.cat-info'),
};

renderBreeds();

elements.breedsList.addEventListener('change', onBreedSelect);

function onBreedSelect(e) {
  renderCatInfo(e.target.value);
}

function renderCatInfo(id) {
  showLoader();
  elements.catInfo.innerHTML = '';
  fetchCatByBreed(id)
    .then(({ data: [cat] }) => {
      elements.catInfo.innerHTML = getCatInfoCardHTML(cat);
      hideLoader();
    })
    .catch(err => {
      hideLoader();
      showApiError(err);
    });
}

function renderBreeds() {
  showLoader();
  fetchBreeds()
    .then(({ data: breeds }) => {
      elements.breedsList.innerHTML = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
      hideLoader();
      elements.breedsList.classList.remove('visually-hidden');
    })
    .catch(err => {
      hideLoader();
      showApiError(err);
    });
}

function getCatInfoCardHTML(cat) {
  return `<div class="cat-info-card">
            <img class="cat-info-image" src="${cat.url}" alt="cat" />
            <div class="cat-info-holder">
              <h2 class="cat-info-title">${cat.breeds[0].name}</h2>
              <p class="cat-info-text">${cat.breeds[0].description}</p>
              <p class="cat-info-text"><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
            </div>
          </div>`;
}

function showLoader() {
  elements.loader.classList.remove('visually-hidden');
}

function hideLoader() {
  elements.loader.classList.add('visually-hidden');
}

function showApiError(err) {
  iziToast.show({
    color: 'red',
    title: 'Ooops! error occured',
    message: `${err.name}: ${err.message}`,
    position: 'topRight',
  });
}
