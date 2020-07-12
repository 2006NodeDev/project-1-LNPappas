import { getAllUsers } from "../remote/server-api/get-all-users"

export const userTypes = {
    SUCCUSSFUL_REQUEST: 'P1_SUCCUSSFUL_AllUsers',
    AUTHORIZATION_ERROR: 'P1_UNAUTHORIZED',
    EMPTY_LIST: 'P1_NO_USERS',
    INTERNAL_SERVER: 'P1_INTERNAL_SERVER'
}

export const allUsersActionMapper = () => async (dispatch:any) =>{
    try{
        let allUsers = await getAllUsers()
        if( allUsers.length === 0){
            throw new Error('no users')
        }
        dispatch({
            type:userTypes.SUCCUSSFUL_REQUEST,
            payload:{
                allUsers
            }
        })   
    }catch(e){
        if(e.message.includes('401')){
            dispatch({
                type:userTypes.AUTHORIZATION_ERROR
            })
        } else if(e.message.includes('no users')){
            dispatch({
                type:userTypes.EMPTY_LIST
            })
        }else{
            dispatch({
                type:userTypes.INTERNAL_SERVER
            })
        }
    }
}
        // const getUsers = async ()=>{
        //     let response = await getAllUsers()
        //     changeAllUsers(response)
        // }
        // if(allUsers.length === 0){
        //     getUsers()
        // }