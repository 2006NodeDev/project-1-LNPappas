import React, { FunctionComponent, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { IState } from "../../reducers"
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'

export const EditUser:FunctionComponent<any> =  (props)=>{

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstName, changeFirstName] = useState('')
    const [lastName, changeLastName] = useState('')
    const [email, changeEmail] = useState('')
    const [description, changeDescription] = useState('')
    const [role, changeRole] = useState('')

    let currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })

    const updateUsername = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeUsername(event.currentTarget.value)
        }
    }

    const updatePassword = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changePassword(event.currentTarget.value)
        }
    }

    const updateFirstName = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeFirstName(event.currentTarget.value)
        }
    }

    const updateLastName = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeLastName(event.currentTarget.value)
        }
    }

    const updateEmail = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeEmail(event.currentTarget.value)
        }
    }

    // const updateDescription = (event:any) => {
    //     event.preventDefault()
    //     if (event.currentTarget.value){
    //         changeDescription(event.currentTarget.value)
    //     }
    // }

    const updateRole = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value){
            changeRole(event.currentTarget.value)
        }
    }

    const dispatch = useDispatch();
    
    let userSubmit = async () => {
        let thunk = editUserActionMapper(username, password, firstName, lastName, email, role)
        dispatch(thunk)
        props.history.push(`/profile/${props.userId}`)
    }

    let editItems = [<TextField id="username" label="Username" value={props.user.username} onChange={updateUsername}/>,
                        <TextField id="password" type='password' label="Password" value={props.user.password} onChange={updatePassword}/>,
                        <TextField id="firstName" label="firstName" value={props.user.firstName} onChange={updateFirstName}/>,
                        <TextField id="lastName" label="lastName" value={props.user.lastName} onChange={updateLastName}/>,
                        // <TextField id="description" label="description" value={props.user.description} onchange={updateDescription}/>
                        <TextField id="email" label="email" value={props.user.email} onChange={updateEmail}/>]
    
    if (currentUser.role.roleId === 1){
        editItems.push(<TextField id="role" label="role" value={props.user.role.roleId} onChange={updateRole}/>)
    } 

    return (
        <div className='edituser'>
            <form className='form_edituser' autoComplete="off" onSubmit={userSubmit}>
                {editItems}
                <Button type='submit' variant="contained" color="primary">Update</Button>
            </form>
        </div>
    )
}