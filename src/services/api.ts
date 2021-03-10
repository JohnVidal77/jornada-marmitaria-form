import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.emailjs.com/api/v1.0/',
});

export default api;
