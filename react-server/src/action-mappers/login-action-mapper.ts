import { serverLogin } from "../remote/server-api/server-login"

export const loginTypes = {
    SUCCESSFUL_LOGIN: 'P1_SUCCESSFUL_LOGIN',
    BAD_CREDENTIALS: 'P1_BAD_CREDENTIALS',
    INTERNAL_SERVER: 'P1_LOGIN_INTERNAL_SERVER',
    BAD_REQUEST: 'P1_LOGIN_BAD_REQUEST',
    RESET_ERROR: 'P1_RESET_ERROR',
    USER_LOGOUT: 'USER_LOGOUT'
}

export const LoginActionMapper = (username:string, password:string) => async (dispatch:any) => {
    try{
        if (username === 'logout'){
            throw Error('logout') 
        }
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
        }else if (e.message === 'logout'){
            dispatch({
                type:loginTypes.USER_LOGOUT
            })
        } else {
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