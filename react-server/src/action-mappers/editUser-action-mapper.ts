import {editUser} from '../remote/server-api/edit-user'

export const editUserTypes = {
    SUCCESSFUL_LOGIN: 'P1_SUCCESSFUL_EDIT_USER',
    INTERNAL_SERVER: 'P1_EDIT_USER_INTERNAL_SERVER',
    BAD_REQUEST: 'P1_EDIT_USER_BAD_REQUEST',
    BAD_CREDENTIALS: 'P1_EDIT_USER_BAD_CREDENTIALS',
}
export const editUserActionMapper = (username:string, password:string, firstName:string, lastName:string, email:string, description:string) => async (dispatch:any) => {
    try {
        let user = await editUser(username, password, firstName, lastName, email, description)
        dispatch({
            type:editUserTypes.SUCCESSFUL_LOGIN,
            payload:{
                user
            }
        })
    } catch (e) {
        if(e.message.includes('400')){
            dispatch({
                type:editUserTypes.BAD_REQUEST
            })
        } else if (e.message.includes('401')){
            dispatch({
                type:editUserTypes.BAD_CREDENTIALS
            })
        }else {
            dispatch({
                type:editUserTypes.INTERNAL_SERVER
            })
        }
    }
}