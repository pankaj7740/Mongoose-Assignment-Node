export * from "./file"
export * from "./products"
export * from "./user"

// import Joi, { string } from "joi";
// import { Request, Response, NextFunction } from "express";
// import { IProduct,Product,IUser,User } from "../models";
// import Jwt  from "jsonwebtoken";
// import multer from "multer"
// import passport from "passport";
// import passportJwt from "passport-jwt"
// import { ExtractJwt } from "passport-jwt";
// import jwt from "jsonwebtoken";
// import { compareHashPassword } from "../config";
// import { findUser } from "../services";

// import {Strategy as LocalStrategy} from "passport-local";



// const validateProductBody = (req:Request,res:Response,next:NextFunction)=>{
//     const {error} = Joi.object<IProduct>({
//         pid: Joi.number().required(),
//         title: Joi.string().required(),
//         price: Joi.number().required(),
//         category: Joi.string().required(),
//         description: Joi.string().min(3).required(),
//         image: Joi.string()
//     }).validate(req.body)
//     if(error){
//         res.status(400).send(error.details[0].message);
//     }
//     next()
// }
// const validateProductId = (req:Request,res:Response,next:NextFunction)=>{
//    const {error} = Joi.object({
//     _id:Joi.string().hex().length(24)
//    }).validate(req.params.id)
//    if(error){
//     res.status(400).send(error.details[0].message);
//    }
//    next();
// }
// const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
//     const token = req.headers['authorization'];
//     if(!token){
//         return res.status(401).send("Token is not valid");
//     }else{
//         try{
//             const decoded = Jwt.verify(token,String(process.env.SECRET_KEY));
//             // console.log(decoded);
//         //     // req.user = decoded;
//         //    const tse= res.locals.Jwt = decoded;
//         //    tse;
//         //    console.log(tse);
//             next();
//         }catch(err){
//             res.status(401).send("Unauthorised access");
//         }
//     }
// }

//  const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'images')
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//         cb(null, file.originalname); 
//       },
// });
// export const upload = multer({ storage:storage });

// export const initiallizePassport = (passport:passport.PassportStatic)=>{
//     passport.serializeUser((user,done)=>done(null,user));
//     passport.deserializeUser((user:IUser,done)=>done(null,user));
//     passport.use(new LocalStrategy({usernameField:'username',passwordField:'passcode'},
//     async(username:string,passcode:string,done:Function)=>{
//         try {
//            const user:any = await findUser(username);
//            console.log(user +"user is founded");
//            if(user && compareHashPassword(passcode,user.passcode)){
//             console.log("password is also matched");
//             return done(null, user);
//            }else{
//             return done(null, false);
//            }  
//         } catch (error) {
//             return done(error, false);
//         }
//     }))  
// }


// export  {validateProductBody,validateProductId,verifyToken}







// // passport.serializeUser<any, any>((req, user, done) => {
// //     done(undefined, user);
// // });

// // passport.deserializeUser((id, done) => {
// //     User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
// // });