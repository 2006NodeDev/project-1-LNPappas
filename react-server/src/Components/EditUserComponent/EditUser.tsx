import React, { FunctionComponent, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { IState } from "../../reducers"
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { editUserActionMapper } from '../../action-mappers/editUser-action-mapper'

export const EditUser:FunctionComponent<any> =  (props)=>{

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstName, changeFirstName] = useState('')
    const [lastName, changeLastName] = useState('')
    const [email, changeEmail] = useState('')
    const [description, changeDescription] = useState('')

    let currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })

    changeUsername(currentUser.username)
    changePassword(currentUser.password)
    changeFirstName(currentUser.firstName)


    const updateUsername = (event:any) => {
        event.preventDefault()
        
        if (event.currentTarget.value){
            changeUsername(event.currentTarget.value)
        } else {
            changeUsername(currentUser.username)
        }
    }

    const updatePassword = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changePassword(event.currentTarget.value)
        }else{
            changePassword(currentUser.password)
        }
    }

    const updateFirstName = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value !== ''){
            changeFirstName(event.currentTarget.value)
        }else{
            changeFirstName(currentUser.firstName)
        }
    }

    const updateLastName = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeLastName(event.currentTarget.value)
        }else {
            changeLastName(currentUser.lastName)
        }
    }

    const updateEmail = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeEmail(event.currentTarget.value)
        }else {
            changeEmail(currentUser.email)
        }
    }

    const updateDescription = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeDescription(event.currentTarget.value)
        } else{
            changeDescription(currentUser.description)
        }
    }

    const dispatch = useDispatch();
    
    let userSubmit = async () => {
        let thunk = editUserActionMapper(username, password, firstName, lastName, email, description)
        dispatch(thunk)
        (currentUser.role.roleId === 1)?
        props.history.push(`/profile/${currentUser.userId}`)
        :
        props.history.push(`/profile/${currentUser.userId}`)
    }

    let editItems = [<TextField id="username" label={currentUser.username} value={username} onChange={updateUsername}/>,
                        <TextField id="password" type='password' label="Password" value={password} onChange={updatePassword}/>,
                        <TextField id="firstName" label={currentUser.firstName} value={firstName} onChange={updateFirstName}/>,
                        <TextField id="lastName" label={currentUser.lastName} value={lastName} onChange={updateLastName}/>,
                        <TextField id="description" label="description" value={description} onChange={updateDescription}/>,
                        <TextField id="email" label={currentUser.email} value={email} onChange={updateEmail}/>]
 
    return (
        (currentUser)?
        <div className='edituser'>
            <form className='form_edituser' autoComplete="off" onSubmit={userSubmit}>
                {editItems}
                <Button type='submit' variant="contained" color="primary">Update</Button>
            </form>
        </div>
        :
        <div className="loading">loading...</div>
    )
}