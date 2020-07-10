import { serverClient } from "."


export const getUserById = async (userId:number) =>{

    try{
        let response = await serverClient.get(`/users/${userId}`)
        return response.data
    } catch(e){
        console.log(e);
        throw e   
    }
}