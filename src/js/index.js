import { fetchImages } from './api';
import { showEl, hideEl } from './helpers';
import { createMarkup } from './createMarkup';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const infoMsg = document.querySelector('.info-msg');

const PER_PAGE = 40;
let currentQuery = null;
let page = 1;

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onLoadMoreBtnClick() {
  fetchImages(currentQuery, page, PER_PAGE)
    .then(data => {
      page += 1;
      if (data.totalHits < page * PER_PAGE) {
        hideEl(loadMoreBtn);
        showEl(infoMsg);
      }
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    })
    .catch(err => console.error(err));
}

function onSearchSubmit(evt) {
  currentQuery = '';
  page = 1;
  evt.preventDefault();
  hideEl(loadMoreBtn);
  hideEl(infoMsg);

  const {
    searchQuery: { value: query },
  } = evt.currentTarget.elements;

  fetchImages(query, page, PER_PAGE)
    .then(data => {
      page += 1;

      evt.target.reset();
      currentQuery = query;
      showEl(loadMoreBtn);
      gallery.innerHTML = '';
      if (!data.total) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    })
    .catch(err => {
      console.error(err);
      hideEl(loadMoreBtn);
    });
}
