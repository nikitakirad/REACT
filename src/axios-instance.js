import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://blog-app-e7a85.firebaseio.com/'
});

export default instance;