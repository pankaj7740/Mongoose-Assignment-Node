import { Schema,model } from "mongoose";
import { IProductHead } from "../../lib";

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