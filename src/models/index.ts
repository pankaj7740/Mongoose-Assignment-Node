import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
  pid: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
}

// export interface ProductModel extends IProduct, Document{}

const productSchema:Schema = new Schema<IProduct>({
  pid: {
    type: Number,
    required:true,
  },
  title: { 
    type: String,
    required:true
  },
  price: { 
    type: Number,
    required:true  
  },
  category: { 
    type: String ,
    required:true
  },
  description: { 
    type: String,
    required:true
  },
  image: { 
    type: String 
  }
});

export const Product = model<IProduct>("Product",productSchema);
// export default model<ProductModel>("Product",productSchema)

