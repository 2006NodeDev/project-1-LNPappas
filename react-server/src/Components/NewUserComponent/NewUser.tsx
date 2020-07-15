import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { User } from "../../models/User";
import { newUserServer } from "../../remote/server-api/new-user";

export const NewUser:FunctionComponent<any> = (props) => {

    let[username, changeUsername] = useState('')
    let[password, changePassword] = useState('')
    let[firstName, changeFirstName] = useState('')
    let[lastName, changeLastName] = useState('')
    let[email, changeEmail] = useState('')
    let[description, changeDescription] = useState('')
    let[image, changeImage] = useState(undefined)

    const updateUsername = (e:any) => {
        e.preventDefault()
        changeUsername(e.currentTarget.value)
    }

    const updatePassword = (e:any) => {
        e.preventDefault()
        changePassword(e.currentTarget.value)
    }

    const updateFirstName = (e:any) => {
        e.preventDefault()
        changeFirstName(e.currentTarget.value)
    }

    const updateLastName = (e:any) => {
        e.preventDefault()
        changeLastName(e.currentTarget.value)
    }

    const updateEmail = (e:any) => {
        e.preventDefault()
        changeEmail(e.currentTarget.value)
    }

    const updateDescription = (e:any) => {
        e.preventDefault()
        changeDescription(e.currentTarget.value)
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

    const submitUser = async (e:SyntheticEvent) => {
        e.preventDefault()
        let newUser:User = {
            userId:0,
            username,
            password,
            firstName,
            lastName,
            email,
            description,
            image,
            role: {
                roleId: 1,
                role: 'user'
            }
        }
        await newUserServer(newUser)
        props.history.push(`/login`)
    }

    return(
        <div>
            <form onSubmit={submitUser}>
                <TextField label='username' value={username} onChange={updateUsername}></TextField>
                <TextField label='password' type='password' value={password} onChange={updatePassword}></TextField>
                <TextField label='password' type='confirm password' value={password} onChange={updatePassword}></TextField>
                <TextField label='firstName' value={firstName} onChange={updateFirstName}></TextField>
                <TextField label='lastName' value={lastName} onChange={updateLastName}></TextField>
                <TextField label='email' value={email} onChange={updateEmail}></TextField>
                <TextField label='description' value={description} onChange={updateDescription}></TextField>
                <label htmlFor='file'>Profile Pic</label>
                <input type='file' name='file' accept='image/*' onChange={updateImage}/>
                <img src={image}/>
                <Button variant="contained" type='submit'>Submit</Button>

            </form>
        </div>
    )
}