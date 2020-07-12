import React, { FunctionComponent } from 'react';
import { UserDisplay } from '../UserDisplayComponent/UserDisplay';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';


export const Profile:FunctionComponent<any> =  (props)=>{
    let currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })
    
    return (
            (currentUser)?
            <UserDisplay user={currentUser}/>
            :
            <div>
                <h3>Loading...</h3>
            </div>

        )
    }