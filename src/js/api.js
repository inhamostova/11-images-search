const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31781224-f2235db9c919ebb7ef96866ff';

function fetchImages(query, page, per_page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  });

  return fetch(`${BASE_URL}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchImages };
