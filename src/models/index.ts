import { model, Schema, Document, Types } from "mongoose";

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

export const User = model<IUser>("User",userSchema);


export interface IProductHead extends Document {
  name: string;
  age: number;
  location: string;
}
const productHeadSchema: Schema = new Schema<IProductHead>({
  name: { type: String },
  age: { type: Number },
  location: { type: String },
});
export const ProdctHead = model<IProductHead>("Head", productHeadSchema);

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
