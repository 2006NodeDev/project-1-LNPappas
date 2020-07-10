import React, { FunctionComponent, useState, useEffect } from 'react';
import { UserDisplay } from '../UserDisplayComponent/UserDisplay';
import { User } from '../../models/User';
import { useParams} from 'react-router-dom'
import { getUserById } from '../../remote/server-api/get-by-id';

export const Profile:FunctionComponent<any> =  (props)=>{
    let [userProfile, changeUserProfile] = useState<null | User>(null)
    let {userId} = useParams()

    useEffect(()=>{
        let getUser = async ()=>{
            let userInfo = await getUserById(userId)
            changeUserProfile(userInfo)
        }
        if(!userProfile || userProfile.userId !== +userId){
            getUser()
        }
    })
    
return (
        (userProfile)?
        <UserDisplay user={userProfile}/>
        :
        <div>
            <h3>User Not Found</h3>
        </div>
    )
}