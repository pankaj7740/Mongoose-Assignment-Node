import { compareSync } from "bcryptjs";

export const compareHashPassword = (password:string,hashed:string)=>{
    return compareSync(password,hashed);
}

export const addition = (a:number,b:number)=>{
  return a+b;
}

