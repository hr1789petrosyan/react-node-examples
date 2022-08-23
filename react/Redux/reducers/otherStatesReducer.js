import { IS_DRAWING, IS_MOBILE } from '../actionTypes/actionTypes'
import { changeOtherState } from '../actions/actions'
import { otherStates } from '../states/states'

export default function otherStatesReducer(state = otherStates, action) {
    switch(action.type) {

        case IS_MOBILE:
            return changeOtherState('isMobile', state, action)
        
        case IS_DRAWING:
            return changeOtherState('isDrawing', state, action)

        default: return state
        
    }
}
