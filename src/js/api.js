import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31781224-f2235db9c919ebb7ef96866ff';

async function fetchImages(query, page, per_page) {
  const resp = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page,
    },
  });
  return resp.data;
}

export { fetchImages };
