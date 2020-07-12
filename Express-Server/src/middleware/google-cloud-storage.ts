import { Request, Response, NextFunction } from "express";

const util = require('util')

const gcsHelpers = require('../helpers/google-cloud-storage');
const { storage } = gcsHelpers;

const DEFAULT_BUCKET_NAME = 'example-bucket-project1'

export const sendUploadToGCS = (req:Request, res:Response, next:NextFunction)=>{
    if(!req['file']){
        return next();
    }


    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req['file'].originalname}`;
    const file = bucket.file(gcsFileName)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req['file'].mimetype,
        },
    });

    stream.on('error', (err:Error) => {
        req['file'].cloudStorageError = err;
        console.log(err)
        next(err);
    });

    stream.on('finish', () => {
        req['file'].cloudStorageObject = gcsFileName;

        return file.makePublic()
            .then(()=>{
                req['file'].gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
                next();
            });
    });

    stream.end(req['file'].buffer);
}

export const uploadImage = (file:any) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file

    const bucket = storage.bucket(DEFAULT_BUCKET_NAME);
  
    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    blobStream.on('finish', () => {
      const publicUrl = util.format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
  })