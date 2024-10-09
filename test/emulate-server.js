const PubNub = require('pubnub');

const pubnub = new PubNub({
    subscribeKey: 'sub-c-44ae1c95-5224-4096-9477-198e4a3b87bd',
    uuid: 'eidcmp-client-lib-a3188bac-a188-4f27-b3d3-d11fd6b4a6cf'
  });

const guidChannel = 'b58d3b44-565f-49d6-82c0-da4e3cde9699';

async function publishEvent(message) {
    try {
        const result = await pubnub.publish({
            channel: guidChannel, 
            message: message
        });

        console.log('Evento publicado com sucesso:', result);
    } catch (error) {
        console.error('Erro ao publicar evento:', error.message);
    }
}

publishEvent({ data: { name: 'John', 'experience': '5 years' } , isvalid: true });
