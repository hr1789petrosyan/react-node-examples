const { Participant, Room, CanvasData } = require('../../../database/Models')
const { Log } = require('../../LogService/LogService')
const SocketServer = require('../SocketServer')
const io = SocketServer.instance

const date = new Date()
const todayDate = date.toISOString().slice(0, 10);
const time = `${date.getHours()}: ${date.getMinutes()}`

exports.changingRoomHandler = async function ({ room_id, roomName }) {
    const { userId, teamId } = this.handshake.query
    const room = roomName + '_' + teamId
    io
    .in(room)
    .emit('participant-room-changed', {
        type: "ParticipantChangesRoom", 
        participant: {
            identity: +userId, 
            socketRoom: roomName
        }
    })
    Participant.findOneAndDelete({user_id: +userId}, (err, data) => {
        if(!err){
            Log(`[${todayDate}: ${time}]`, "Participant successfully disconnected: participant ID:", +userId);
        }else {
            console.log('ERROR OCCURED', err);
        }
    })
    const participants = await Participant.find({ room_id })
    if(!participants.length) {
        await CanvasData.findOneAndDelete({ room_id })

        Room.findOne({ _id: room_id }).then(room => {
            if(room.type === "Temporary") {
                room.delete()
            }
        })
    }
    this.leave(room)
}