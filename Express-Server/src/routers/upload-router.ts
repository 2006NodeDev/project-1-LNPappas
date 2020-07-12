import express, { Request, Response, NextFunction } from 'express';
// import { sendUploadToGCS } from '../middleware/google-cloud-storage'
// const Multer = require('multer');
// const bodyParser = require('body-parser')
// import { uploadImage } from '../middleware/google-cloud-storage'

export const uploadRouter = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

uploadRouter.post('/', upload.single('image'), async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const image = req['file'].buffer
        if(image){
            console.log('got it!');
        }
    } catch (error) {
        console.log(error);
    }
})

// uploadRouter.post('/',
//     sendUploadToGCS,
//     async (req:Request, res:Response, next:NextFunction) => {
//       if (req['file'] && req['file'].gcsUrl) {
//         return res.send(req['file'].gcsUrl);
//       }
//       return res.status(500).send('Unable to upload');
//     },
//   );


// const multerMid = Multer({
//     storage: Multer.memoryStorage(),
//     limits: {
//       // no larger than 5mb.
//       fileSize: 5 * 1024 * 1024,
//     },
// })
// uploadRouter.disable('x-powered-by')
// uploadRouter.use(multerMid.single('file'))
// uploadRouter.use(bodyParser.json())
// uploadRouter.use(bodyParser.urlencoded({extended: false}))

// uploadRouter.post('/', async (req:Request, res:Response, next:NextFunction) => { 
//     try {
//       const myFile = req['file']
//       console.log("myfile:", myFile);
      
//       const imageUrl = await uploadImage(myFile)
//       res
//         .status(200)
//         .json({
//           message: "Upload was successful",
//           data: imageUrl
//         })
//     } catch (error) {
//         console.log('error in upload.post');
        
//       next(error)
//     }
//   })