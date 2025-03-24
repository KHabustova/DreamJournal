
import axios from 'axios';

const API_URL = "http://localhost:8009";
const MOOD_URL = "http://localhost:8009/api/moods";

const APIRequestsHandler = {
    getEntries: async () => {
        try {
            const response = await axios.get(API_URL);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getMoods: async() => {
        try {
            const response = await axios.get(MOOD_URL);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    fetchEntryByID: async(id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    createEntry: async(entry) => {
        try {
            return await axios.post(`${API_URL}/new`, entry);
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    deleteEntry: async(id) => {
        try{
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error
        }
    },

    updateEntry: async(id, updatedEntry) => {
        try{
            const response = await axios.put(`${API_URL}/${id}`, updatedEntry, 
                 {headers: { "Content-Type": "application/json" }})
            return response.data;
        }catch(error) {
            console.log(error);
            throw error;
        }
    }



}

export default  APIRequestsHandler;
