import { Request, Response, NextFunction } from "express";

export function loggingMiddleWare(req:Request, res:Response, next:NextFunction){
    console.log(`${req.method} Request from ${req.ip} to ${req.path}`);
    next() 
}