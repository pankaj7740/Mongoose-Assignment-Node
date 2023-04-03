import {describe,it} from "mocha"
import {app} from "../index"
import request from "supertest"

describe("/profile",()=>{
    // it("should register new Profile",(done)=>{
    //     request(app)
    //     .post("/api/profile/register")
    //     .send({
    //         name: "newProfile",
    //         email: "newProfile@gmail.com",
    //         password: "newProfile",
    //         role:"USER"
    //     })
    //     .expect(201,done)
    // });

    it("should login the existing profile",(done)=>{
        request(app)
        .post("/api/profile/login")
        .send({
            email: "newProfile@gmail.com",
            password: "newProfile"
        })
        .expect(200,done)
    })

    const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld3Byb2ZpbGVAZ21haWwuY29tIiwiX2lkIjoiNjQyYTZkYTYzNTAwMTU2ZDQxYzZjZDg3IiwiaWF0IjoxNjgwNTAzMzAzLCJleHAiOjE2ODA1MTA1MDN9.NXX0eVE45oTH2m2siX71cMhXMyxAgFerWlNK0jE5gag"

    it("Should provide the all profile",(done)=>{
        request(app)
        .get("/api/profile")
        .set({
            Authorization:`Bearer ${token}`
        })
        .send({
            page:1,
            size:5
        })
        .expect(200,done);
    })
})