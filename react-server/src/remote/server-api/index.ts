import axios from 'axios'
import { BaseUrl } from '../../environment/environment'

export const serverClient = axios.create({
    baseURL:BaseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials:true
})