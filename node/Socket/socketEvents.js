const Socket = require('./SocketServer')
const io = Socket.instance 

const { onlineParticipantsHandler } = require('./SocketEventHandlers/onlineParticipantsHandler')
const { currentRoomHandler } = require('./SocketEventHandlers/currentRoomHandler')
const { changingRoomHandler } = require('./SocketEventHandlers/changingRoomHandler')
const { disconnectHandler } = require('./SocketEventHandlers/disconnectHandler')
 
io.on('connection', socket => {
    const { teamId } = socket.handshake.query
    socket.join(teamId)

    socket.on(`${teamId}/online-participants`, onlineParticipantsHandler.bind(socket))
    socket.on(`${teamId}/get-current-room`, currentRoomHandler.bind(socket))
    socket.on(`${teamId}/changingRoom`, changingRoomHandler.bind(socket))
    socket.once('disconnect', disconnectHandler.bind(socket))  
})