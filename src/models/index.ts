import { NextFunction } from "express";
import { model, Schema, Document, Types } from "mongoose";
import bcrypt, { compareSync } from "bcryptjs"

export interface IProduct extends Document {
  pid: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

// export interface ProductModel extends IProduct, Document{}

const productSchema: Schema = new Schema<IProduct>({
  pid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});
export const Product = model<IProduct>("Product", productSchema);

export interface IUser extends Document{
  username: string;
  passcode: string;
}

const userSchema: Schema = new Schema<IUser>({
  username: {type:String,required:true,unique:true,lowercase:true},
  passcode: {type:String,required:true,},
})
//Applying pre Hooks on schema
userSchema.pre("save",function(next){
  const user = this;
  if(user.isModified('passcode')){
    bcrypt.genSalt(10,(err,salt)=>{
      if(err)
      return next(err);
      bcrypt.hash(user.passcode,salt,(err,hash)=>{
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

export interface IFileUpload extends Document{
  filename: string;
  path: string;
}

const fileUploadSchema: Schema = new Schema<IFileUpload>({
  filename: {type:String},
  path:     {type:String},
});

export const File = model<IFileUpload>("File",fileUploadSchema);


export interface IProductHead extends Document {
  name: string;
  age: number;
  location: string;
  farm?:Types.ObjectId;
}
const productHeadSchema: Schema = new Schema<IProductHead>({
  name: { type: String },
  age: { type: Number },
  location: { type: String },
  farm:[
    {
      type:Schema.Types.ObjectId,
      ref:"Farm"
    }
  ]
});
export const Head = model<IProductHead>("Head", productHeadSchema);

export interface IFarm extends Document {
  name: string;
  price: number;
  category: string;
  heads?: Types.ObjectId;
}
const farmSchema: Schema = new Schema<IFarm>({
  name: { type: String },
  price: { type: Number },
  category: { type: String },
  heads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Head",
    },
  ],
});

export const Farm = model<IFarm>("Farm", farmSchema);
