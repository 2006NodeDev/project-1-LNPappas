import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { IState } from "../../reducers"
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { editUserActionMapper } from '../../action-mappers/editUser-action-mapper'
import { User } from '../../models/User'
import { makeStyles } from '@material-ui/core/styles';
import { LoginActionMapper } from '../../action-mappers/login-action-mapper'
import '../../App.css'

const useStyles = makeStyles((theme) => ({
    textField: {
        alignSelf: 'center',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        paddingRight: 1,
        paddingLeft:2,
        marginTop: 0,
        fontWeight: 500
    },
    media:{
        maxWidth: "400px",
        maxHeight: "400px",
    }
}))

export const EditUser:FunctionComponent<any> = (props)=>{

    const classes = useStyles();

    let currentUser = useSelector((state:IState)=>{
        return state.loginState.currentUser
    })

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstName, changeFirstName] = useState('')
    const [lastName, changeLastName] = useState('')
    const [email, changeEmail] = useState('')
    const [description, changeDescription] = useState('')
    const [image, changeImage] = useState(undefined)

    const updateUsername = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value !== undefined){
            changeUsername(event.currentTarget.value)
        } else {
            changeUsername(currentUser.username)
        }
    }

    const updatePassword = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value !== undefined){
            changePassword(event.currentTarget.value)
        } else {
            changePassword(currentUser.password)
        }
    }

    const updateFirstName = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value !== undefined){
            changeFirstName(event.currentTarget.value)
        } else{
            changeFirstName(currentUser.firstName)
        }
    }

    const updateLastName = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value !== ''){
            changeLastName(event.currentTarget.value)
        }
    }

    const updateEmail = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value !== ''){
            changeEmail(event.currentTarget.value)
        }
    }

    const updateDescription = (event:any) => {
        event.preventDefault()
        if (event.currentTarget.value !== ''){
            changeDescription(event.currentTarget.value)
        } else {
            changeDescription(currentUser.description)
        }
    }

    const updateImage = (e:any) => {
        e.preventDefault()
        let file:File = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result);
            changeImage(reader.result)
        }
    }

    const dispatch = useDispatch();
    
    let userSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
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
        try {
            let thunk = editUserActionMapper(user)
            dispatch(thunk)
            
            let thunk2 = LoginActionMapper(username, password)
            dispatch(thunk2)

        } catch (error) {
            console.log(error);
            console.log('React server Edit User'); 
        }
        props.history.push(`/profile/${currentUser.userId}`)
    }

    let editItems = [<TextField className={classes.textField} id="username" label="username" value={username || ''} onChange={updateUsername}/>,
                        <TextField className={classes.textField} id="password" type='password' label="Password" value={password || ''} onChange={updatePassword}/>,
                        <TextField className={classes.textField} id="firstName" label="first name" value={firstName || ''} onChange={updateFirstName}/>,
                        <TextField className={classes.textField} id="lastName" label="last name" value={lastName || ''} onChange={updateLastName}/>,
                        <TextField className={classes.textField} id="description" label="description" value={description || ''} onChange={updateDescription}/>,
                        <TextField className={classes.textField} id="email" label="email" value={email || ''} onChange={updateEmail}/>,<br/>, 
                        <br/>,<label className={classes.textField} htmlFor='file'>Profile Pic   </label>,
                        <input type='file' name='file' accept='image/*' onChange={updateImage}/>,
                        <img src={image || ''} alt=''/>]
 
    return (
        (currentUser)?
        <div className='edituser'>
            <form className='form_edituser' autoComplete="off" onSubmit={userSubmit}>
                {editItems}<br />
                <Button type='submit' variant="contained" color="primary">Update</Button>
            </form>
        </div>
        :
        <div className="loading">loading...</div>
    )
}