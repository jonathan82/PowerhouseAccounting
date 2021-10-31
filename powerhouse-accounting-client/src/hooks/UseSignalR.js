import { useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const useSignalR = (url) => {
    const [connection] = useState(new HubConnectionBuilder()
        .withUrl(url)
        .withAutomaticReconnect()
        .build());

    // useEffect(() => {
    //     const newConnection = new HubConnectionBuilder()
    //         .withUrl(url)
    //         .withAutomaticReconnect()
    //         .build();
    //     const start = async () => {
    //         try {
    //             await newConnection.start();
    //             setConnection(newConnection);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     start();
    // }, [])
    return connection
}

export default useSignalR