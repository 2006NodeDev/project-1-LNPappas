import { IAllUsersState } from '.'
import { AnyAction } from 'redux'
import { userTypes } from '../action-mappers/allUsers-action-mapper'

const initialState:IAllUsersState = {
    userList: undefined,
    errorMessage:''
}

export const allUserReducer = (state=initialState, action:AnyAction)=>{
    switch (action.type){
        case userTypes.AUTHORIZATION_ERROR:{
            return {
                ...state,
                errorMessage:'You are not authroized'
            }
        }
        case userTypes.EMPTY_LIST:{
            return {
                ...state,
                errorMessage:'There are no users'
            }
        }
        case userTypes.INTERNAL_SERVER:{
            return {
                ...state,
                errorMessage:'Oops, Something Went Wrong'
            }
        }
        case userTypes.SUCCUSSFUL_REQUEST:{
            return {
                ...state,
                userList:action.payload.allUsers
            }
        }
        default:{
            return state
        }
    }
}