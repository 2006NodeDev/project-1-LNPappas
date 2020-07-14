import { serverClient } from "."

export const editUser = async (username:string, password:string, firstName: string, lastName:string, email:string, description:string) =>{
    let role = 1
    let edit = {
        username,
        password,
        firstName,
        lastName,
        email,
        description,
        role
    }
    try {
        let response = await serverClient.patch('/users', edit)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}