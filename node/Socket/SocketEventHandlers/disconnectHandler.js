const { Room, Participant, CanvasData } = require('../../../database/Models')
const { Log } = require('../../LogService/LogService')
const SocketServer = require('../SocketServer')
const io = SocketServer.instance

const date = new Date()
const todayDate = date.toISOString().slice(0, 10);
const time = `${date.getHours()}: ${date.getMinutes()}`


exports.disconnectHandler = function() {
    const { userId, teamId } = this.handshake.query

    try {
        Room
            .aggregate()
            .match({teamId : +teamId})
            .lookup({
                from: "participants",
                localField: "_id",
                foreignField: "room_id",
                as: "participants",
            })
            .then(allTeamRooms => {
                let bool = true
                allTeamRooms.forEach(teamRoom => {
                    teamRoom.participants.forEach(participant => {
                        if(participant.user_id == userId) {
                            const roomName = teamRoom.name + '_' + teamId
                            io
                            .in(roomName)
                            .emit('participantDisconnected', {
                                type: 'ParticipantDisconnected', 
                                participant: {
                                    identity: userId
                                }
                            })
                            this.leave(roomName)
                        }
                        if(bool) {
                            const roomParticipants = teamRoom.participants.find(participant => participant.user_id != userId)
                            if(roomParticipants === undefined) {
                                CanvasData.findOneAndDelete({room_id: teamRoom._id}).then(() => {
                                    bool = false
                                })
                                if(teamRoom.type === "Temporary") {
                                    Room.findOneAndDelete({_id: teamRoom._id}).then(() => {})
                                }
                            }
                        }
                    })
                })
            })
            .then(() => {
                Participant.findOneAndDelete({
                    user_id: userId
                }, (err, data) => {
                    if(!err){
                        Log(`[${todayDate}: ${time}]`,"Participant successfully disconnected with socket disconnect event: participant ID: ", userId);
                    }else {
                        console.log('ERROR OCCURED', err);
                    }
                })
                .then(() => {
                    Room
                    .aggregate()
                    .match({teamId : +teamId})
                    .lookup({
                        from: "participants",
                        localField: "_id",
                        foreignField: "room_id",
                        as: "participants",
                    })
                    .then(allTeamRooms => {
                        io
                        .in(teamId)
                        .emit('rooms-and-online-participants', {
                            type: "OnlineParticipants", 
                            rooms: allTeamRooms
                        })
                    })
                })
            })
            .catch(err => {
                console.log(err)
            })
            
    } catch (error) {
        console.log(error);
    }
}