import { combineReducers } from "redux";
import { User } from "../models/User";
import { loginReducer } from "./login-reducer";
import { allUserReducer } from "./allUsers-reducer";
// import { idUserReducer } from "./idUsers-reducer";

//interface for login
export interface ILoginState{
    currentUser:User,
    errorMessage:string
}

export interface IAllUsersState{
    userList:User[],
    errorMessage:string
}

export interface IidUsersState{
    user:User,
    errorMessage:string
}

export interface IState{
    loginState:ILoginState,
    allUserState:IAllUsersState,
    // idUserState:IidUsersState,
}

export const state = combineReducers<IState>({
    loginState:loginReducer,
    allUserState:allUserReducer,
    // idUserState:idUserReducer,
})
 