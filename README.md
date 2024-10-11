
Credential Management Library

# Credential Management Library

This is a Node.js library designed to interact with our internal protocol for issuing and verifying credentials. It authenticates using an `apiKeyToken` and manages JWT tokens for authenticated requests. The library automatically retries authentication if the token expires.

## Installation

To install the library in your Node.js project, run:

```bash
npm install wallid-certishop-sdk
```

## Usage

### 1. Import the library

```javascript
const { configure, createCredentials, verifyCredentials } = require('credential-management-lib');
```

### 2. Configure the library

Set your `apiKeyToken` for authentication:

```javascript
init('your_api_key_token');
```

### 3. Create credentials

```javascript
const payload = {
  cid: 'cid_value', // Certificate Authority (CA) id
  tid: 'tid_value', // Template id 
  waAdmin: 'waAdmin_value', // wallet address of the admin creating the credential
  data: [{ key: 'value' }], // data to be stored in the credential (in the format of a list of key value pairs)
  email: 'user@domain.com', // email where the credential will be sent
};
createCredentials(payload)
  .then(response => console.log('Credentials Created:', response))
  .catch(error => console.error('Error creating credentials:', error));
```

### 4. Verify credentials

```javascript
const payload = {
  tid: 'tid_value', // required to verify the any credential matching this tid
  id: 'id_value', // if sent will try to verify the credential with this id, if not sent will match any credential with this tid
  guid: 'guid_value', // this is a unique identifier for the verification session and is returned in the init method
};

verifyCredentials(payload)
  .then(response => console.log('Credentials Valid:', response))
  .catch(error => console.error('Error verifying credentials:', error));
```

## Running Tests

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   npm test
   ```

## License

This project is licensed under the MIT License.
