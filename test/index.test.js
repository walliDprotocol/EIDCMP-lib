jest.mock('axios'); 

const axios = require('axios');
const { configure, createCredentials, verifyCredentials } = require('../lib/index');

afterEach(() => {
    jest.clearAllMocks(); 
});

describe('Credential Library Tests', () => {

    beforeAll(() => {
        configure('test_api_key_token');
    });

    test('should create credentials successfully', async () => {
        const payload = { username: 'test_user', password: 'test_pass' };

        axios.post.mockResolvedValueOnce({ data: { token: 'mock_token' } });

        axios.post.mockResolvedValueOnce({ data: { credentialId: '12345' } });

        const response = await createCredentials(payload);

        expect(response).toHaveProperty('credentialId');
        expect(response.credentialId).toBe('12345');
        expect(axios.post).toHaveBeenCalledTimes(2);  
    });

    test('should verify credentials successfully', async () => {
        const payload = { credentialId: 'test_credential_id' };

        axios.post.mockResolvedValueOnce({ data: { token: 'mock_token' } });

        axios.post.mockResolvedValueOnce({ data: { isValid: true } });

        const response = await verifyCredentials(payload);

        expect(response).toHaveProperty('isValid');
        expect(response.isValid).toBe(true);
        expect(axios.post).toHaveBeenCalledTimes(2); 
    });
});
