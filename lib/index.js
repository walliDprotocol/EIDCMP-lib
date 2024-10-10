const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const PubNub = require('pubnub');

let apiUrl = 'https://demo.eidcmp.wallid.io/api/v1/credential'; // Internal API URL
let token = '';
let guid = '';
let pubnub;


/**
 * Initialize the library, create a random GUID, configure the token and set up PubNub subscription.
 * @param {string} newToken - The token to use for authenticated requests.
 * @param {Object} pubnubConfig - Configuration for PubNub (publishKey, subscribeKey).
 */
async function init(newToken, callbackVerifyData) {
    token = newToken;
    guid = uuidv4(); // Generate a random GUID

    console.log('guid : ', guid);
    const pubnubConfig = {
        subscribeKey: 'sub-c-44ae1c95-5224-4096-9477-198e4a3b87bd',
        userId: 'eidcmp-client-lib'
    }

    // Initialize PubNub with the provided configuration
    pubnub = new PubNub(pubnubConfig);

    // Subscribe to the PubNub channel using the generated GUID
    pubnub.subscribe({ channels: [guid] });
    pubnub.addListener({
        message: function(event) {
            console.log(`Message received on channel ${guid}:`, event.message);
            // Add your event handler logic here
            callbackVerifyData(event.message)
        },
        status: function(status) {
            console.log(`PubNub status on channel ${guid}:`, status);
        }
    });

    console.log('Library initialized with GUID:', guid);
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

/**
 * Get a verification URL using the generated GUID.
 * @returns {Promise<string>} - The verification URL.
 */
async function getVerifyURL(tid) {
    try {
        const response = await makeAuthenticatedRequest('POST', '/create-verify-url', { guid, tid });
        return response.data.verificationUrl;
    } catch (error) {
        throw new Error('Failed to get verify URL: ' + error.message);
    }
}

module.exports = {
    init,
    createCredentials,
    verifyCredentials,
    getVerifyURL,
    PubNub
};
