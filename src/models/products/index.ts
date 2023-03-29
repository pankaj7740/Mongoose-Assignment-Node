import { Schema,model } from "mongoose";
import { IProduct } from "../../lib";

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