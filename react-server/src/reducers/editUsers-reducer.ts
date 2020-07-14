import { IeditUsersState } from "."
import { AnyAction } from "redux"
import { editUserTypes } from "../action-mappers/editUser-action-mapper"

const initalState:IeditUsersState = {
    user: undefined,
    errorMessage: ''
}

export const editUserReducer = (state= initalState, action:AnyAction) => {
    switch (action.type) {
        case editUserTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Incorrect Username or Password'
            }
        }
        case editUserTypes.BAD_REQUEST : {
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case editUserTypes.INTERNAL_SERVER: {
            return {
                ...state,
                errorMessage:'Oops, Something Went Wrong'
            }
        }
        case editUserTypes.SUCCESSFUL_LOGIN:{
            return {
                ...state,
                User:action.payload.user
            }
        }
        default:{
            return state
        }
    }
}