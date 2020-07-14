import { combineReducers } from "redux";
import { User } from "../models/User";
import { loginReducer } from "./login-reducer";
import { allUserReducer } from "./allUsers-reducer";
import { editUserReducer } from "./editUsers-reducer";

export interface ILoginState{
    currentUser:User,
    errorMessage:string
}

export interface IAllUsersState{
    userList:User[],
    errorMessage:string
}

export interface IeditUsersState{
    user:User,
    errorMessage:string
}

export interface IState{
    loginState:ILoginState,
    allUserState:IAllUsersState,
    editUserState:IeditUsersState,
}

export const state = combineReducers<IState>({
    loginState:loginReducer,
    allUserState:allUserReducer,
    editUserState:editUserReducer,
})
 