const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31781224-f2235db9c919ebb7ef96866ff';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(evt) {
  evt.preventDefault();

  const {
    searchQuery: { value: query },
  } = evt.currentTarget.elements;

  fetchImages(query).then(data => {
    evt.target.reset();
    gallery.innerHTML = '';
    if (!data.total) {
      alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    gallery.innerHTML = createMarkup(data.hits);
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/>
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');
}

function fetchImages(query) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type =photo&orientation=horizontal&safesearch=true`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
