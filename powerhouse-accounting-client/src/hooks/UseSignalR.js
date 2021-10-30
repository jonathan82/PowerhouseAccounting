import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const useSignalR = (url) => {
    const [connection, setConnection] = useState(null);
    useEffect(() => {        
        const newConnection = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .build();
        const start = async () => {
            try {
                await newConnection.start();
                setConnection(newConnection);
            } catch (error) {
                console.log(error)
            }            
        }        
        start();
    }, [])
    return connection
}

export default useSignalR