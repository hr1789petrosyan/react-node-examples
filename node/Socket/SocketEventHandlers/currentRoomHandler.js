const { Room } = require('../../../database/Models')
const SocketServer = require('../SocketServer')
const io = SocketServer.instance

exports.currentRoomHandler = async function({ roomName }) {
    const { teamId } = this.handshake.query
    this.join(roomName.toString())
    let idx = roomName.lastIndexOf('_');
    let socketRoomName
    if (idx != -1) {
        socketRoomName = roomName.substring(0, idx)
    }
    
    Room
        .aggregate()
        .match({teamId : +teamId})
        .lookup({
            from: "participants",
            localField: "_id",
            foreignField: "room_id",
            as: "participants",
        })
        .then(rooms => {
            try {
                io
                .to(roomName)
                .emit('my-current-room', {
                    type: 'UserCurrentRoom', 
                    CurrentRoom: rooms.find(room => room.name == socketRoomName)
                })
            } catch (error) {
                console.log(error);
            }
        })
        .catch(err => {
            console.log(err)
        })
}