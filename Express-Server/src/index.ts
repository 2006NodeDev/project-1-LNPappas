/*
   Express Router
*/ 

import express, { Request, Response, NextFunction } from 'express';
import { sessionMiddleware } from './middleware/session-middleware';
import { AuthenticationFailureError } from './errors/AuthenticationFailureError';
import { userRouter } from './routers/user-router';
import { getUserByUserNameAndPassword } from './dao/SQL/user-dao';
import { corsFilter } from './middleware/cors-filter';
import { uploadRouter } from './routers/upload-router';
import { loggingMiddleWare } from './middleware/logging-middleware';

// returns pre-build express app, must run first
const app = express();

// middleware: body-parser, only parses json
app.use(express.json());

// middleware: logging
app.use(loggingMiddleWare)

//middleware: cors filter
app.use(corsFilter);
// middleware: creates unique sessions 
app.use(sessionMiddleware);

// create router for /users
app.use('/users', userRouter);
app.use('/upload', uploadRouter);

/*
    Login
        URL: /login
        Method: POST
        Request:
            {
                username: string,
                password: string
            }
        Response: User
        Error Response:
            Status Code: 400 BAD REQUEST
            {
                message: "Invalid Credentials"
            }
*/
app.post('/login', async (req:Request, res:Response, next:NextFunction)=>{

    // get username and password from body of request
    let username = req.body.username;
    let password = req.body.password;

    // if username or password are empty throw error
    if(!username || !password){
        throw new AuthenticationFailureError();
    // if username & password are valid & found in database, request a session for the user & respond with the user info in json format
    } else{
        try {
            let user = await getUserByUserNameAndPassword(username, password);
            req.session.user = user;
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
})

/* start server on port 2006
 access through browser or postman
 http://localhost:2006 or http://127.0.0.1
*/
app.listen(2006, ()=> console.log('Server started...'));