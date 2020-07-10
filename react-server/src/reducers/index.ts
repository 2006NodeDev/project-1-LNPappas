import { combineReducers } from "redux";
import { User } from "../models/User";
import { loginReducer } from "./login-reducer";

//interface for login
export interface ILoginState{
    currentUser:User,
    errorMessage:string
}

export interface IState{
    loginState:ILoginState
}

export const state = combineReducers<IState>({
    loginState:loginReducer
})
 