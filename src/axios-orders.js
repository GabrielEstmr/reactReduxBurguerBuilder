import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-my-burguer-gabriel.firebaseio.com/'
})


export default instance;