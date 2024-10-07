const axios = require('axios');
let apiUrl = 'https://demo.eidcmp.wallid.io/api/v1/credential'; // Internal API URL
let token = '';

async function configure(token) {
    token = token;
}

/**
 * Perform an API call to create credentials.
 * @param {Object} payload - The payload to send for credential creation.
 * @returns {Promise<Object>} - The response data from the API.
 */
async function createCredentials(payload) {
    try {
        const response = await makeAuthenticatedRequest('POST', '/create', payload);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create credentials: ' + error.message);
    }
}

/**
 * Perform an API call to verify credentials.
 * @param {Object} payload - The payload to send for credential verification.
 * @returns {Promise<Object>} - The response data from the API.
 */
async function verifyCredentials(payload) {
    try {
        const response = await makeAuthenticatedRequest('POST', '/verify', payload);
        return response.data;
    } catch (error) {
        throw new Error('Failed to verify credentials: ' + error.message);
    }
}

/**
 * Helper function to make an authenticated request to the API.
 * Automatically retries authentication if the token is invalid.
 * @param {string} method - The HTTP method (GET, POST, etc.).
 * @param {string} endpoint - The API endpoint to call.
 * @param {Object} data - The request payload.
 * @returns {Promise<Object>} - The API response.
 */
async function makeAuthenticatedRequest(method, endpoint, data) {
    try {
        // Make the API request with the JWT token
        const response = await axios({
            method,
            url: `${apiUrl}${endpoint}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        });
        return response;
    } catch (error) {
        throw error; // Rethrow any other errors
    }
}

module.exports = {
    createCredentials,
    verifyCredentials
};
