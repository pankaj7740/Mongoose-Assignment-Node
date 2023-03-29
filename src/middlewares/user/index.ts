import { compareHashPassword } from "../../config";
import { findUser } from "../../services";
import { IUser } from "../../lib";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";


export const initiallizePassport = (passport:passport.PassportStatic)=>{
    passport.serializeUser((user,done)=>done(null,user));
    passport.deserializeUser((user:IUser,done)=>done(null,user));
    passport.use(new LocalStrategy({usernameField:'username',passwordField:'passcode'},
    async(username:string,passcode:string,done:Function)=>{
        try {
           const user:any = await findUser(username);
           console.log(user +"user is founded");
           if(user && compareHashPassword(passcode,user.passcode)){
            console.log("password is also matched");
            return done(null, user);
           }else{
            return done(null, false);
           }  
        } catch (error) {
            return done(error, false);
        }
    }))  
}