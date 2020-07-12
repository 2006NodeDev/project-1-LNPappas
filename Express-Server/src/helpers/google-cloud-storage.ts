import { Storage } from '@google-cloud/storage'

const serviceKey = process.env['GOOGLE_KEY'];
const project = 'unique-perigee-279818'

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: project,
})

export const getPublicUrl = (bucketName:String, fileName:String): string => `https://storage.googleapis.com/${bucketName}/${fileName}`;