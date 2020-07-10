import { serverLogin } from "../remote/server-api/server-login"

export const loginTypes = {
    SUCCESSFUL_LOGIN: 'P1_SUCCESSFUL_LOGIN',
    BAD_CREDENTIALS: 'P1_BAD_CREDENTIALS',
    INTERNAL_SERVER: 'P1_LOGIN_INTERNAL_SERVER',
    BAD_REQUEST: 'P1_LOGIN_BAD_REQUEST',
    RESET_ERROR: 'P1_RESET_ERROR'
}

export const LoginActionMapper = (username:string, password:string) => async (dispatch:any) => {
    try{
        let currentUser = await serverLogin(username,password)
        dispatch({
            type:loginTypes.SUCCESSFUL_LOGIN,
            payload:{
                currentUser
            }
        })
    } catch(e){        
        if(e.message.includes('400')){
            dispatch({
                type:loginTypes.BAD_REQUEST
            })
        } else if (e.message.includes('401')){
            dispatch({
                type:loginTypes.BAD_CREDENTIALS
            })
        }else {
            dispatch({
                type:loginTypes.INTERNAL_SERVER
            })
        }

    }
}


export const loginErrorReset = () =>{
    return{
        type:loginTypes.RESET_ERROR
    }
}