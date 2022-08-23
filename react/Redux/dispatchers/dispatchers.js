import { PARTICIPANT_MIC_STATE_CHANGED, IS_MOBILE, IS_DRAWING } from '../actionTypes/actionTypes'
import { PARTICIPANT_CAMERA_STATE_CHANGED, NEW_PARTICIPANTS } from '../actionTypes/actionTypes'
import { SET_ROOM_OPTIONS } from '../actionTypes/actionTypes'

export const setCameraStateWithUserId = (id, status) => ({ type: PARTICIPANT_CAMERA_STATE_CHANGED, id, status })
export const setMicStateWithUserId = (id, status) => ({ type: PARTICIPANT_MIC_STATE_CHANGED, id, status })
export const setNewParticipants = participants => ({ type: NEW_PARTICIPANTS, participants })

export const setIsMobile = state => ({ type: IS_MOBILE, state })
export const setDrawing = state => ({ type: IS_DRAWING, state })

export const setToken = token => ({ type: SET_ROOM_OPTIONS, token})
export const setError = error => ({ type: SET_ROOM_OPTIONS, error})
export const setRoomName = roomName => ({ type: SET_ROOM_OPTIONS, roomName})
export const setOptionType = optionType => ({ type: SET_ROOM_OPTIONS, optionType })