import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import AuthReducer from "../Store/Reducers/AuthReducer"
import { combineReducers } from "redux"



var midware = applyMiddleware(thunk)

var combine = combineReducers({
    AuthReducer
})

var Store = createStore(combine, midware)
Store.subscribe(() => {
    console.log("Store State", Store.getState())
})


export default Store