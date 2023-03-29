import { IFileUpload } from "../../lib";

export const UploadFile = (file:IFileUpload)=>{
    return new Promise((resolve, reject) => {
      file.save()
    .then(resolve)
    .catch(reject);
    });
  }