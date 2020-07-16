import { imageBucket } from "."

export async function saveProfilePicture(contentType:string, base64:string, fileName:string){
    try {
        let newImage = imageBucket.file(fileName)
        
        await newImage.save(Buffer.from(base64, 'base64'), {
            metadata:{
                contentType
            }
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}