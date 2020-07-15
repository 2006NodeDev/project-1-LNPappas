import React, { FunctionComponent, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { IState } from "../../reducers"
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { editUserActionMapper } from '../../action-mappers/editUser-action-mapper'
import { User } from '../../models/User'

export const EditUser:FunctionComponent<any> =  (props)=>{

    let currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })

    const [username, changeUsername] = useState(currentUser.username)
    const [password, changePassword] = useState(currentUser.password)
    const [firstName, changeFirstName] = useState(currentUser.firstName)
    const [lastName, changeLastName] = useState(currentUser.lastName)
    const [email, changeEmail] = useState(currentUser.email)
    const [description, changeDescription] = useState(currentUser.description)
    const [image, changeImage] = useState(undefined)

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

    const updateImage = (e:any) => {
        // e.preventDefault()
        let file:File = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result);
            changeImage(reader.result)
        }
    }

    const dispatch = useDispatch();
    
    let userSubmit = async () => {
        let user:User = {
            userId:currentUser.userId,
            username,
            password,
            firstName,
            lastName,
            email,
            description,
            image,
            role:currentUser.role
        }
        let thunk = editUserActionMapper(user)
        dispatch(thunk)
        (currentUser.role.roleId === 1)?
        props.history.push(`/users`)
        :
        props.history.push(`/profile/${currentUser.userId}`)
    }

    let editItems = [<TextField id="username" label={currentUser.username} value={username || ''} onChange={updateUsername}/>,
                        <TextField id="password" type='password' label="Password" value={password || ''} onChange={updatePassword}/>,
                        <TextField id="firstName" label={currentUser.firstName} value={firstName || ''} onChange={updateFirstName}/>,
                        <TextField id="lastName" label={currentUser.lastName} value={lastName || ''} onChange={updateLastName}/>,
                        <TextField id="description" label="description" value={description || ''} onChange={updateDescription}/>,
                        <TextField id="email" label={currentUser.email} value={email || ''} onChange={updateEmail}/>, 
                        <label htmlFor='file'>Profile Pic</label>,
                        <input type='file' name='file' accept='image/*' onChange={updateImage}/>,
                        <img src={image} alt={require('../../Pictures/noimage.png')}/>]
 
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