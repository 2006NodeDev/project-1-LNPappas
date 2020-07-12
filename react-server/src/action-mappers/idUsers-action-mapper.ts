import { getUserById } from '../remote/server-api/get-by-id'

export const userIdTypes = {
    SUCCUSSFUL_REQUEST: 'P1_SUCCUSSFUL_AllUsers',
    AUTHORIZATION_ERROR: 'P1_UNAUTHORIZED',
    NO_USER_ERROR: 'P1_NO_USERS',
    INTERNAL_SERVER: 'P1_INTERNAL_SERVER'
}

export const idUserActionMapper = (userId:any) => async (dispatch:any) =>{
    try {
        let userInfo = await getUserById(userId)
        if(!userInfo){
            throw new Error('unknown user id')
        }
        dispatch({
            type:userIdTypes.SUCCUSSFUL_REQUEST,
            payload:{
                userInfo
            }
        })
    } catch (e) {
        if(e.message.includes('401')){
            dispatch({
                type:userIdTypes.AUTHORIZATION_ERROR
            })
        } else if(e.message.includes('unknown user id')){
            dispatch({
                type:userIdTypes.NO_USER_ERROR
            })
        }else{
            dispatch({
                type:userIdTypes.INTERNAL_SERVER
            })
        }
    }
}

