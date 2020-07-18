import { Storage } from "@google-cloud/storage";

// const GOOGLE_APPLICATION_CREDENTIALS = ['GOOGLE_APPLICATION_CREDENTIALS']

// export const bucketName = 'example-bucket-project1';
export const bucketName = 'lnpappas.com';

export const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`

export const imageBucket = new Storage().bucket(bucketName)

//https://googleapis.dev/nodejs/storage/latest/global.html#CreateWriteStreamOptions
