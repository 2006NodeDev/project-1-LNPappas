import { compose, applyMiddleware, createStore } from "redux"
import reduxThunk from 'redux-thunk'
import { state } from "./reducers"

//the browser window
const w:any = window

//if they have dev tools installed use them, else use the default
const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//apply redux thunk
const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
)

//actually build the store
export const store = createStore(
    state,
    enhancer
)