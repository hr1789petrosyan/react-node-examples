import { createRoomStates } from '../states/states'
import { SET_ROOM_OPTIONS } from '../actionTypes/actionTypes'
import { changeCreateRoomStates } from '../actions/actions'

export function createRoomReducer(state = createRoomStates, {type, ...changableValue}) {
    switch(type) {
        case SET_ROOM_OPTIONS:
            return changeCreateRoomStates(state, changableValue)

        default: return state
    }
}