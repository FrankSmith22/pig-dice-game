import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import { socket } from './socket';
import {EVENTS as E} from './app/events'

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }
        function onDisconnect() {
            setIsConnected(false)
        }


        socket.on(E.PLAYER_CONNECT, onConnect)

        return () => {
            socket.off(E.PLAYER_CONNECT, onConnect)
        }
    }, [])

    return (
        <div className="App">
            <Main
                isConnected={isConnected}
                socket={socket}
            />
        </div>
    );
}

export default App;
