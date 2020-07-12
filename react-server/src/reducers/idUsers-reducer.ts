import { IidUsersState } from '.'
import { AnyAction } from 'redux'
import { userIdTypes } from '../action-mappers/idUsers-action-mapper'

const initalState:IidUsersState = {
    user:undefined,
    errorMessage:'',
}

export const idUserReducer = (state=initalState, action:AnyAction) => {
    switch(action.type){
        case userIdTypes.AUTHORIZATION_ERROR:{
            return {
                ...state,
                errorMessage:'You are not authroized'
            }
        }
        case userIdTypes.NO_USER_ERROR:{
            return{
                ...state,
                errorMessage:'No user with that id'
            }
        }
        case userIdTypes.INTERNAL_SERVER:{
            return {
                ...state,
                errorMessage:'Oops, Something Went Wrong'
            }
        }
        case userIdTypes.SUCCUSSFUL_REQUEST:{
            return {
                ...state,
                user:action.payload.userById
            }
        }
    }
}
