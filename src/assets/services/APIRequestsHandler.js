
import axios from 'axios';

const API_URL = "http://localhost:8009/";
const MOOD_URL = "http://localhost:8009/api/moods";

const APIRequestsHandler = {
    getEntries: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    getMoods: async() => {
        try {
            const response = await axios.get(MOOD_URL);
            return response.data;
        } catch(error) {
            console.log(error);
        }
    },

    createEntry: async() => {

    },

    deleteEntry: async() => {

    }

    updateEntry: async() => {
        
    }



}

export default  APIRequestsHandler;
