import axios from 'axios';


const instance = axios.create({
    baseURL : "https://burger-builder-fccc7.firebaseio.com/"
});

export default instance;