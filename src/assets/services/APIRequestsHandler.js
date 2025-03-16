
import axios from 'axios';

const API_URL = "http://localhost:8009/";

const APIRequestsHandler = {
    getEntries: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.log(error);
        }
        
    }

}

export default  APIRequestsHandler;
