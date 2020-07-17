import React, { FunctionComponent } from 'react';
import { UserDisplay } from '../UserDisplayComponent/UserDisplay';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../reducers';
import { allUsersActionMapper } from '../../action-mappers/allUsers-action-mapper';


export const Profile:FunctionComponent<any> =  (props)=>{
    let currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })

    let dispatch = useDispatch()
    
    if(currentUser.role.roleId === 1 || currentUser.role.roleId === 2 ){
        const allUserSubmit = async () => {
            let thunk = allUsersActionMapper()
            dispatch(thunk)
        }
        allUserSubmit()
    }
    
    return (
            (currentUser)?
            <UserDisplay user={currentUser} {...props}/>
            :
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }