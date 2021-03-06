import { User } from "../../models/User"
import { serverClient } from ".";

export const newUserServer = async (newUser:User) =>{

    try {
        let response = await serverClient.post('/users', newUser)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}