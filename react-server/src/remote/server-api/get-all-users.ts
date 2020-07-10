
import { serverClient } from ".";

export const getAllUsers = async () =>{
    try{
        let response = await serverClient.get('/users')
        return response.data
    }catch(e){
        console.log(e);
        throw e
    }
}