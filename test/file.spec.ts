import {describe,it} from "mocha"
import {app} from "../index"
import request from "supertest";

describe("",()=>{
    it("Should upload a new file",(done:Function)=>{
        request(app)
        .post("/api/upload/file")
        .attach('image',"C://Users//hp//Documents")
        .expect(201,done)
    })
})