import { Document, Types } from "mongoose";

export interface IProduct extends Document {
    pid: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
 }

 export interface IUser extends Document{
    username: string;
    passcode: string;
  }

  
  export interface IProductHead extends Document {
    name: string;
    age: number;
    location: string;
    farm?:Types.ObjectId;
  }

  export interface IFarm extends Document {
    name: string;
    price: number;
    category: string;
    heads?: Types.ObjectId;
  }

  export interface IFileUpload extends Document{
    filename: string;
    path: string;
  }