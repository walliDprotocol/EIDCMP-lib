const { init, getVerifyURL } = require('../lib'); // Sua lib que contém o init e getVerifyURL

const token = 'your-auth-token';

async function startClient() {
    try {
        await init(token, (data) => console.log('callback was called ', data));

        console.log('Aguardando eventos no canal PubNub...');
    } catch (error) {
        console.error('Erro ao inicializar o cliente:', error.message);
    }
}

startClient();
