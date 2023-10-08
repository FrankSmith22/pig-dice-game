import { Server } from "socket.io"

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
})

io.listen(4000)

const users = {}

io.on('connection', socket => {
    socket.on('user-connected', () => {
        console.log('User connected!')
        users[socket.id] = socket.id
        console.log(`Number of users: ${Object.keys(users).length}`)
    })
    socket.on('disconnect', () => {
        delete users[socket.id]
    })
})