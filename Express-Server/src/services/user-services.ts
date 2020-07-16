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

        let fileName = `users/${newUser.username}/profile.${contentType}`
        let savedUser =  await getNewUser(newUser)
        saveProfilePicture(contentType, imagebase64Data, fileName)
        return savedUser
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

export async function editUserService(updatedUser:User):Promise<User>{
    try {
        let base64Image = updatedUser.image
        let [dataType, imagebase64Data] = base64Image.split(';base64,')
        let contentType = dataType.split('/').pop()

        if (updatedUser.image){
            updatedUser.image = `${bucketBaseUrl}/users/${updatedUser.username}/profile.${contentType}`
        }
        let fileName = `users/${updatedUser.username}/profile.${contentType}`
        console.log(fileName);
        
        let savedUser =  await updateOneUser(updatedUser)
        saveProfilePicture(contentType, imagebase64Data, fileName)
        return savedUser
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

export async function getUserByUserNameAndPasswordService(username:string, password:string):Promise<User>{
    return await getUserByUserNameAndPassword(username, password)
}