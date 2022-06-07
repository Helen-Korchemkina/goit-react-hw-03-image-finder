import axios from 'axios';

function fetchPictures(q, page) {
    const options = {
      params: {
        key: '26837460-553b8b6dbfe9a53b3dd0b8a3a',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        q,
        page,
      },
    };
    return axios.get('https://pixabay.com/api/', options);
};
  
const api = {
  fetchPictures,
};

export default api;