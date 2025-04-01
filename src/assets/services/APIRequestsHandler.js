import axios from 'axios';

// Base API URL for the backend. 
const API_URL = "http://localhost:8009";

// URL for fetching moods
const MOOD_URL = "http://localhost:8009/api/moods";

/**
 * A service object for handling REST API requests. Uses AXIOS.
 */
const APIRequestsHandler = {
    /**
     * Fetches all journal entries from the backend.
     * @returns {Promise<Array>} Resolves to an array of journal entries.
     * @throws Will throw an error if the request fails.
     */
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

    /**
     * Fetches all available moods from the backend.
     * @returns {Promise<Array>} Resolves to an array of moods.
     * @throws Will throw an error if the request fails.
     */
    getMoods: async () => {
        try {
            const response = await axios.get(MOOD_URL);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * Fetches a specific journal entry by its ID.
     * @param {string} id - The ID of the journal entry to fetch.
     * @returns {Promise<Object>} Resolves to the journal entry object.
     * @throws Will throw an error if the request fails.
     */
    fetchEntryByID: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * Creates a new journal entry.
     * @param {Object} entry - The journal entry object to create.
     * @returns {Promise<Object>} Resolves to the created journal entry.
     * @throws Will throw an error if the request fails.
     */
    createEntry: async (entry) => {
        try {
            return await axios.post(`${API_URL}/new`, entry);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * Deletes a journal entry by its ID.
     * @param {string} id - The ID of the journal entry to delete.
     * @returns {Promise<Object>} Resolves to the response data.
     * @throws Will throw an error if the request fails.
     */
    deleteEntry: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    /**
     * Updates an existing journal entry by its ID.
     * @param {string} id - The ID of the journal entry to update.
     * @param {Object} updatedEntry - The updated journal entry object.
     * @returns {Promise<Object>} Resolves to the updated journal entry.
     * @throws Will throw an error if the request fails.
     */
    updateEntry: async (id, updatedEntry) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedEntry, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default APIRequestsHandler;
