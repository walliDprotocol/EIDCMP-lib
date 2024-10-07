const axios = require('axios');
let apiKeyToken = '';
let apiUrl = 'https://certishop.wallid.com/api'; // Internal API URL
let token = '';

/**
 * Set the API key token for authentication.
 * @param {string} keyToken - The application API key token.
 */
function configure(keyToken) {
    apiKeyToken = keyToken;
}

/**
 * Authenticate with the API using the provided API key token, and store the JWT token.
 * @returns {Promise<void>}
 */
async function authenticate() {
    try {
        const response = await axios.post(`${apiUrl}/auth`, {
            apiKeyToken
        });
        token = response.data.token; // Assuming the token is returned in the response
    } catch (error) {
        console.error('Authentication failed:', error.message);
        throw new Error('Unable to authenticate.');
    }
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
        if (error.response && error.response.status === 401) {
            // If unauthorized, re-authenticate and retry the request
            console.log('Token expired, re-authenticating...');
            await authenticate();
            return makeAuthenticatedRequest(method, endpoint, data); // Retry after getting a new token
        } else {
            throw error; // Rethrow any other errors
        }
    }
}

module.exports = {
    configure,
    createCredentials,
    verifyCredentials
};
