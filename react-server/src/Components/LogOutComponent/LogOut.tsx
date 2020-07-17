import React, { FunctionComponent } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LoginActionMapper } from "../../action-mappers/login-action-mapper";
import { IState } from "../../reducers";

export const LogOut:FunctionComponent<any> = (props) => {
    let dispatch = useDispatch()
    
    const logoutSubmit = async () => {
        let thunk = LoginActionMapper('logout', 'logout')
        dispatch(thunk)
    } 
    
    logoutSubmit()

    let currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })

    console.log(currentUser)

    return(
        (currentUser)?
        <div>Logging Out...</div>
        :
        <Redirect to='/'/>
    )

}