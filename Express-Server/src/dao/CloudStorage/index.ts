import { Storage } from "@google-cloud/storage";


export const bucketName = 'example-bucket-project1';

export const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`

export const imageBucket = new Storage().bucket(bucketName)

// ['GOOGLE_APPLICATION_CREDENTIALS']

//https://googleapis.dev/nodejs/storage/latest/global.html#CreateWriteStreamOptions
