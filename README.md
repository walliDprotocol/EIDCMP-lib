
Credential Management Library

# Credential Management Library

This is a Node.js library designed to interact with our internal protocol for issuing and verifying credentials. It authenticates using an `apiKeyToken` and manages JWT tokens for authenticated requests. The library automatically retries authentication if the token expires.

## Installation

To install the library in your Node.js project, run:

```bash
npm install credential-management-lib
```

## Usage

### 1. Import the library

```javascript
const { configure, createCredentials, verifyCredentials } = require('credential-management-lib');
```

### 2. Configure the library

Set your `apiKeyToken` for authentication:

```javascript
configure('your_api_key_token');
```

### 3. Create credentials

```javascript
const payload = { username: 'test_user', password: 'test_password' };

createCredentials(payload)
  .then(response => console.log('Credentials Created:', response))
  .catch(error => console.error('Error creating credentials:', error));
```

### 4. Verify credentials

```javascript
const payload = { credentialId: '12345' };

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
