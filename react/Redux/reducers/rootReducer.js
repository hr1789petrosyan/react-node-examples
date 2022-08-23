import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createRoomReducer } from './createRoomReducer'
import participantsReducer from './participantsReducer'
import otherStatesReducer from './otherStatesReducer'
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    participantsState: participantsReducer,
    otherStates: otherStatesReducer,
    createRoom: createRoomReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))