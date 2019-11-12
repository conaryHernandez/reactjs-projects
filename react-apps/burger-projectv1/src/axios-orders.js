import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-app-v31716.firebaseio.com/'
});

export default instance;