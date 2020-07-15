import { User } from "../models/User";
import { getAllUsers, getUsersById, getNewUser, updateOneUser, getUserByUserNameAndPassword } from "../dao/SQL/user-dao";
import { saveProfilePicture } from "../dao/CloudStorage/user-Images";
import { bucketBaseUrl } from "../dao/CloudStorage";

export async function getAllUsersService():Promise<User[]>{
    return await getAllUsers()
}

export async function getUserByIdService(id:number):Promise<User>{
    return await getUsersById(id)
}

export async function saveNewUserService(newUser:User):Promise<User>{
    try {
        let base64Image = newUser.image
        let [dataType, imagebase64Data] = base64Image.split(';base64,')
        let contentType = dataType.split('/').pop()

        
        if (newUser.image){
            newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
        }
        let savedUser =  await getNewUser(newUser)
        saveProfilePicture(contentType, imagebase64Data)
        return savedUser
        
    } catch (error) {
        console.log(error);
        throw error
        
    }

}

export async function saveEditUserService(updatedUser:User):Promise<User>{
    return await updateOneUser(updatedUser)
}

export async function getUserByUserNameAndPasswordService(username:string, password:string):Promise<User>{
    return await getUserByUserNameAndPassword(username, password)
}