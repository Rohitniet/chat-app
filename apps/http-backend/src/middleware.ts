import jwt from "jsonwebtoken"
import {jwt_secret} from "@repo/backend_common/index"
import { NextFunction, Request, Response } from "express"


export async function Authware(req:Request,res:Response,next:NextFunction){


    try{
    const token= req.headers.token

    //@ts-ignore
    const userobject=  jwt.verify(token,jwt_secret)

    if(!userobject){
        res.json({
            "message":"invalid user"
        })
    }

    const userid=userobject.id
//@ts-ignore
    req.id=userid

    next();
}catch(e){
    res.json({
        "message":"invalid jwt token"
    })
}

    





}