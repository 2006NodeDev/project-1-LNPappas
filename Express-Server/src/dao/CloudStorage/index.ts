import { Storage } from "@google-cloud/storage";
// const GOOGLE_APPLICATION_CREDENTIALS = ['GOOGLE_APPLICATION_CREDENTIALS']

// export const bucketName = 'example-bucket-project1';
export const bucketName = 'project1.lnpappas.com';

export const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`

export const imageBucket = new Storage().bucket(bucketName)

const corsConfiguration = [
    {
        "origin": ["http://project1.lnpappas.com"],
        "method": ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
        "responseHeader": ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
    }
]
// imageBucket.setCorsConfiguration(corsConfiguration)
try{
    imageBucket.setCorsConfiguration(corsConfiguration).then(function(data) {
        const apiResponse = data[0];
        console.log(apiResponse);
        
      });
} catch (e){
    console.log(e)
}

//https://googleapis.dev/nodejs/storage/latest/global.html#CreateWriteStreamOptions
