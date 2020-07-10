import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllUsers } from '../../remote/server-api/get-all-users'
import { UserDisplay } from '../UserDisplayComponent/UserDisplay'
import { User } from '../../models/User'

export const AllUsers:FunctionComponent<any> = (props) => {

    let [allUsers, changeAllUsers] = useState<User[]>([])

    useEffect(()=>{
        const getUsers = async ()=>{
            let response = await getAllUsers()
            changeAllUsers(response)
        }
        if(allUsers.length === 0){
            getUsers()
        }
    })
    let userDisplays = allUsers.map((user)=>{
        return <UserDisplay key={'user-key-' + user.userId} user={user}/>
    })

    return(
        <div>
            {userDisplays}
        </div>
    )
}