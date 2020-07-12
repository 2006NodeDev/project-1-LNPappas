import React, { FunctionComponent } from 'react'
import { UserDisplay } from '../UserDisplayComponent/UserDisplay'
import { User } from '../../models/User'
import { useSelector } from 'react-redux'
import { IState } from '../../reducers'

export const AllUsers:FunctionComponent<any> = (props) => {
    const allUsers = useSelector((state:IState)=>{
        return state.allUserState.userList
    })

    let userDisplays = allUsers.map((user:User)=>{
        return <UserDisplay key={'user-key-' + user.userId} user={user}/>
    })

    return(
        <div >
            {userDisplays}
        </div>
    )
}