import axios from 'axios';

export default axios.create({
    // have to update when we are hitting a prodcution/different server
    baseURL: 'http://localhost:3500'
});