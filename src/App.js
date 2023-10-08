import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import { socket } from './socket';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }
    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)

    return () => {
      socket.off('connect', onConnect)
    }
  }, [])

  return (
    <div className="App">
      <Main isConnected={ isConnected }/>
    </div>
  );
}

export default App;
