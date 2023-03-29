import { IFileUpload } from "../../lib";
import { Schema,model } from "mongoose";

const fileUploadSchema: Schema = new Schema<IFileUpload>({
    filename: {type:String},
    path:     {type:String},
  });
  
  export const File = model<IFileUpload>("File",fileUploadSchema);