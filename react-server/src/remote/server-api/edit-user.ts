import { serverClient } from "."
import { User } from "../../models/User";

export const editUser = async (edit:User) =>{
    try {
        let response = await serverClient.patch('/users', edit)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}