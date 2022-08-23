import setupLocalAudioAndVideoTracks from '../HelperFunctions/Participant/TrackListeners/setupLocalAudioAndVideoTracks'
import setupLocalDataTrack from './DataTrack'
import SocketService from './SocketService'
import twilioVideo from 'twilio-video'
import api from './Api'


export default class TwilioConnect { 
    socket = SocketService()

    constructor(...args) {
        if (!TwilioConnect.exists) {
            if(!args.length) throw new Error("Can not establish connection without user, teamId, token, roomName arguments")
            return this.connect(...args)
        }
        return TwilioConnect.instance
    }

    async connect(user, teamId, token, roomName) {
        const video = document.getElementById('local-participant')
        const { availableMediaDevices, mediaDevices } = await setupLocalAudioAndVideoTracks(video)
        await api.post(`/update-participant?user_id=${user.id}`, {
            ...availableMediaDevices
        })
        const dataTrack = setupLocalDataTrack()
        const tracks = mediaDevices.concat(dataTrack)
        const twilioRoom = await twilioVideo.connect(token, {
            UniqueName: roomName,
            tracks,
            dominantSpeaker: true
        })
    
        if (twilioRoom) {
            this.socket.emit(`${teamId}/get-current-room`, { roomName })
            this.socket.emit(`${teamId}/online-participants`, { roomName })
    
            TwilioConnect.exists = true
            this.twilioRoom = twilioRoom
            TwilioConnect.instance = this
        }
    }

    disconnect() {
        this.twilioRoom.localParticipant.tracks.forEach((function (trackPublication) {
            if (trackPublication.track && trackPublication.track.stop) {
              trackPublication.track.stop()
            }
        }))
        this.twilioRoom.disconnect()
        TwilioConnect.exists = false
        TwilioConnect.instance = false
    }
}
