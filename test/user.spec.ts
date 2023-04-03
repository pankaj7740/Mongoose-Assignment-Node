import {describe,it} from "mocha"
import {app} from "../index"
import request from "supertest"

// describe("/passport/register",()=>{
//     it("should register the new user",(done)=>{
//         request(app)
//         .post("/api/passport/register")
//         .send({
//             username:"anotheruser",
//             passcode:"password"
//         })
//         .expect(201,done)
//     })
// })
describe("/passport/login",()=>{
    it("should login the new user",(done)=>{
        request(app)
        .post("/api/passport/login")
        .send({
            username:"anotheruser",
            passcode:"password"
        })
        .expect("Login successfully",done)
    })
});