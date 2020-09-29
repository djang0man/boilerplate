const axios = require('axios');

const { BASE_API_URL } = process.env;

export default {
  fetchPosts() {
    return axios.get(`${BASE_API_URL}/posts`);
  },
};
