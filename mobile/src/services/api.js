import axios from 'axios';

const api = axios.create({
    baseURL: 'http://leandroteste.localtunnel.me'
})

export default api;