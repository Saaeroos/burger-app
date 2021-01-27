import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-project-e95e3.firebaseio.com/'
})

export default instance;