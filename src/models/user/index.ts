import { Schema,model } from "mongoose";
import { IUser } from "../../lib";
import {genSalt,hash} from "bcryptjs";

const userSchema: Schema = new Schema<IUser>({
    username: {type:String,required:true,unique:true,lowercase:true},
    passcode: {type:String,required:true,},
  })
  //Applying pre Hooks on schema
  userSchema.pre<IUser>("save",function(next){
    const user = this;
    if(user.isModified('passcode')){
      genSalt(10,(err,salt)=>{
        if(err)
        return next(err);
        hash(user.passcode,salt,(err,hash)=>{
          if(err)
          return next(err);
          user.passcode = hash;
          next();
        })
      })
    }else{
      next();
    }
  });
  
  //Applying Post hooks on schema
  userSchema.post("save",(user)=>{
    console.log(`user saved of Id : ${user._id}`);
  
  })
    
  export const User = model<IUser>("User",userSchema);