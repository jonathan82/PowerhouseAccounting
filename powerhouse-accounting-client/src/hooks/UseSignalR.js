import { useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const useSignalR = (url) => {
    const [connection] = useState(new HubConnectionBuilder()
        .withUrl(url)
        .withAutomaticReconnect()
        .build());

    const startConnection = async () => {
        try {
            await connection.start()
        } catch (error) {
            console.log('cannot start connection: ' + error)
        }
    }

    return [connection, startConnection]
}

export default useSignalR