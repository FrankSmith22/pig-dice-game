import { io } from 'socket.io-client';

export const socket = io('http://192.168.1.169:4000')
// export const socket = io('https://pig-dice-game-server.glitch.me')

// export const socket = io('http://localhost:4000', {
//     autoConnect: false
// });
