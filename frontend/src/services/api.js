//Users/adam/trello_clone_nest_prisma/frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;
