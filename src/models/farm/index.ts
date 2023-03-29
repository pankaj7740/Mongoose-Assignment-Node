import { Schema,model } from "mongoose";
import { IFarm } from "../../lib";

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