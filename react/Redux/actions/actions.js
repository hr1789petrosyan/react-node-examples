export const changeOtherState = (stateType, state, action) => 
    stateType === 'isMobile' 
        ? { ...state, isMobile: action.state } 
        : { ...state, isDrawing: action.state }

export const changeParticipantsState = (state, action) => ( { ...state , participants: action.participants } ) 

export const changeParticipantTrackState = (deviceType, state, action) => {
    const participants = state.participants.map(participat => 
        participat.user_id != action.id
            ? participat
            : deviceType === 'camera' 
                ? { ...participat, isCameraEnabled: action.status }
                : { ...participat, isMicEnabled: action.status }
    )
    return {
        ...state,
        participants: [...participants] 
    }
}

export const changeCreateRoomStates = (state, changableValue) => ({ ...state, ...changableValue })
