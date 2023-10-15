import { Server } from "socket.io"
import { createServer } from 'http'

const httpServer = createServer()

const io = new Server(4000, {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.1.169:3000"]
    }
})

const users = {}

io.on('connection', socket => {
    console.log('client connected: ' + socket.id)
    socket.on('attempt-play', playerName => {
        console.log(`===\nPlayer name ${playerName} wants to play!`)
        console.log(`Number of users: ${Object.keys(users).length}`)
        if(Object.keys(users).length === 0) {
            // Tell user to wait till another joins
            console.log("Readied up, waiting for another player to join")
            users[socket.id] = socket.id
            socket.emit('attempt-play-response', 'waiting') // TODO make enum
        }
        else if(Object.keys(users).length === 1) {
            // Tell user game is starting
            if(users[socket.id]){
                // This client is already connected, don't start
                console.log('client hit start button more than once')
                return
            }
            console.log("Readied up, game is starting")
            users[socket.id] = socket.id
            io.emit('attempt-play-response', 'starting') // TODO make enum

        }
        else if(Object.keys(users).length === 2) {
            // Tell user there are already 2 players
            console.log("Sorry, there are already two users playing")
            socket.emit('attempt-play-response', 'full') // TODO make enum
        }
        console.log(users)
    })
    socket.on('disconnect', () => {
        delete users[socket.id]
    })
})