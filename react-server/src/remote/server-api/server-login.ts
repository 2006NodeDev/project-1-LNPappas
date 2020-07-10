import { serverClient } from "."

export const serverLogin = async (username:string, password:string) => {
    let credentials = {
        username,
        password
    }
    try{
        let response = await serverClient.post('/login', credentials)
        console.log(response)
        return response.data // User object
    } catch(e){
        console.log(e);
        throw e
    }
}