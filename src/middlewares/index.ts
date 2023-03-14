import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { IProduct,Product } from "../models";
import Jwt  from "jsonwebtoken";

const secretKey = "secretKey";
const NAMESPACE = "Auth";



const validateProductBody = (req:Request,res:Response,next:NextFunction)=>{
    const {error} = Joi.object<IProduct>({
        pid: Joi.number().required(),
        title: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        description: Joi.string().min(3).required(),
        image: Joi.string()
    }).validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
    }
    next()
}
const validateProductId = (req:Request,res:Response,next:NextFunction)=>{
   const {error} = Joi.object({
    _id:Joi.string().hex().length(24)
   }).validate(req.params.id)
   if(error){
    res.status(400).send(error.details[0].message);
   }
   next();
}
const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers['authorization'];
    console.log(token);
    
    if(!token){
        return res.status(401).send("Token is not valid");
    }else{
        try{
            const decoded = Jwt.verify(token,secretKey);
            // console.log(decoded);
        //     // req.user = decoded;
        //    const tse= res.locals.Jwt = decoded;
        //    tse;
        //    console.log(tse);
            next();
        }catch(err){
            res.status(401).send("Unauthorized");
        }
    }
}

export  {validateProductBody,validateProductId,verifyToken}