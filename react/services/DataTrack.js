import { LocalDataTrack } from 'twilio-video'

export default function setupLocalDataTrack() {
    if(setupLocalDataTrack.exists) {
        return setupLocalDataTrack.instance
    }

    const dataTrack = new LocalDataTrack()

    setupLocalDataTrack.exists = true
    setupLocalDataTrack.instance = dataTrack

    return dataTrack
}
