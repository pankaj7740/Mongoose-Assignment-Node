import { IProduct } from "../../lib";
import { Request,Response,NextFunction } from "express";
import Joi from "joi";
import Jwt  from "jsonwebtoken";

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
    if(!token){
        return res.status(401).send("Token is not valid");
    }else{
        try{
            Jwt.verify(token,String(process.env.SECRET_KEY));
            next();
        }catch(err){
            res.status(401).send("Unauthorised access");
        }
    }
}

export  {validateProductBody,validateProductId,verifyToken}