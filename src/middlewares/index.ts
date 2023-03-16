import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { IProduct,Product } from "../models";
import Jwt  from "jsonwebtoken";
import multer from "multer"


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
            const decoded = Jwt.verify(token,String(process.env.SECRET_KEY));
            // console.log(decoded);
        //     // req.user = decoded;
        //    const tse= res.locals.Jwt = decoded;
        //    tse;
        //    console.log(tse);
            next();
        }catch(err){
            res.status(401).send("Unauthorised access");
        }
    }
}

 const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname); 
      },
});
export const upload = multer({ storage:storage });

export  {validateProductBody,validateProductId,verifyToken}