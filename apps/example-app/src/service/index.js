const axios = require('axios');

const { BASE_API_URL } = process.env;

export default {
  fetchCat() {
    return axios.get(`${BASE_API_URL}/images/search?breed_id=beng`);
  },
};
