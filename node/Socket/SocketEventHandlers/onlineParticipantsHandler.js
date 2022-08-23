const { Room } = require('../../../database/Models')
const SocketServer = require('../SocketServer')
const io = SocketServer.instance

exports.onlineParticipantsHandler = async function(){
    const { teamId } = this.handshake.query
    const rooms = await Room
                    .aggregate()
                    .match({teamId : +teamId})
                    .lookup({
                        from: "participants",
                        localField: "_id",
                        foreignField: "room_id",
                        as: "participants",
                    })
    io
    .to(teamId)
    .emit('rooms-and-online-participants', {
        type: "OnlineParticipants", 
        rooms
    })
}