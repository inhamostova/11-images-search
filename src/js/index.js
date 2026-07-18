import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './api';
import { showEl, hideEl, smoothScrollAfterLoadImages } from './helpers';
import { createMarkup } from './createMarkup';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const infoMsg = document.querySelector('.info-msg');
const target = document.querySelector('.js-target');

const lightbox = new SimpleLightbox('.gallery a');

const PER_PAGE = 40;
let currentQuery = null;
let page = 1;

searchForm.addEventListener('submit', onSearchSubmit);

const options = {
  root: null,
  rootMargin: '600px',
  scrollMargin: '0px',
  threshold: 1.0,
};

const callbackObserver = (entries, observer) => {
  entries.forEach(async entry => {
    try {
      if (entry.isIntersecting) {
        const data = await fetchImages(currentQuery, page, PER_PAGE);
        if (data.totalHits < page * PER_PAGE && data.totalHits) {
          observer.unobserve(target);
          showEl(infoMsg);
          return;
        }
        page += 1;
        gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        lightbox.refresh();
        smoothScrollAfterLoadImages(gallery.firstElementChild ?? searchForm);
      }
    } catch (error) {
      console.log(error.message);
    }
  });
};

const observer = new IntersectionObserver(callbackObserver, options);

async function onSearchSubmit(evt) {
  page = 1;
  evt.preventDefault();
  hideEl(infoMsg);

  const {
    searchQuery: { value: query },
  } = evt.currentTarget.elements;

  if (!query.trim()) {
    alert('Enter search query!');
    return;
  }

  try {
    const data = await fetchImages(query, page, PER_PAGE);
    page += 1;
    currentQuery = query;
    evt.target.reset();
    gallery.innerHTML = '';

    if (!data.total) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    observer.observe(target);

    smoothScrollAfterLoadImages(searchForm);

    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}
