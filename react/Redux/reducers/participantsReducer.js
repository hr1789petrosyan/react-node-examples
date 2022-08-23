import { NEW_PARTICIPANTS, PARTICIPANT_CAMERA_STATE_CHANGED, PARTICIPANT_MIC_STATE_CHANGED } from '../actionTypes/actionTypes'
import { changeParticipantTrackState, changeParticipantsState } from '../actions/actions'
import { participantsState } from '../states/states'

export default function participantsReducer(state = participantsState, action) {

    switch(action.type) {

        case NEW_PARTICIPANTS: 
            return changeParticipantsState(state, action)
            
        case PARTICIPANT_CAMERA_STATE_CHANGED: 
            return changeParticipantTrackState('camera', state, action)

        case PARTICIPANT_MIC_STATE_CHANGED: 
            return changeParticipantTrackState('mic', state, action)
            
        default: return state
        
    }
    
}