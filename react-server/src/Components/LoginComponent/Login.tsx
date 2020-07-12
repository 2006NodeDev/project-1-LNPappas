import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { LoginActionMapper, loginErrorReset } from '../../action-mappers/login-action-mapper'
import { IState } from '../../reducers'
import { toast } from 'react-toastify'
import { allUsersActionMapper } from '../../action-mappers/allUsers-action-mapper'


export const Login:FunctionComponent<any> = (props) => {

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')

    const errorMessage = useSelector((state:IState) => {
        return state.loginState.errorMessage
    })

    const dispatch = useDispatch();

    const updateUsername = (event:any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }

    const updatePassword = (event:any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }
    const getUsers = async ()=>{
        let thunk = allUsersActionMapper()
        dispatch(thunk)
    };

    const loginSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        let thunk = LoginActionMapper(username, password)
        dispatch(thunk)
        getUsers()
        props.history.push(`/profile/${props.userId}`)
    }

    useEffect(()=>{
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(loginErrorReset())
        }
    })

    return (
        <div className='login'>
            <form className='form_login' autoComplete="off" onSubmit={loginSubmit}>
                <TextField id="username" label="Username" value={username} onChange={updateUsername}/>
                <TextField id="password" type='password' label="Password" value={password} onChange={updatePassword} />
                <Button type='submit' variant="contained" color="primary">Login</Button>
            </form>
        </div>
    )
}