import axios from 'axios';

const fetchImages = async (query, page) => {
  const response = await axios.get(`https://pixabay.com/api/`, {
    method: 'get',
    params: {
      key: '33717102-715c10c4f2cae8a60768f134f',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: page,
    },
  });

  return response.data;
};

export default fetchImages;
