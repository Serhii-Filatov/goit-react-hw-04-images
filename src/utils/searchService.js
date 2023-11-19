import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31394022-99a332f5c25b284b0988f9dcf';
export const PER_PAGE = 12;

export const searchService = async (searchValue, currentPage) => {
  axios.defaults.params = {
    key: API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: PER_PAGE,
    page: currentPage,
  };

  const { data } = await axios.get(BASE_URL);
  return data;
};
