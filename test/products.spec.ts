import {describe,it} from "mocha"
import {app} from "../index"
import request from "supertest";

// describe("/products/auth",()=>{
//     it("should create a token",(done)=>{
//         request(app)
//         .post("/api/products/auth")
//         .send({
//             username:"prakashbhai",
//             passcode:"password"
//         })
//         .expect(201,done)
//     })
// })

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicHJha2FzaGJoYWkiLCJwYXNzY29kZSI6IiQyYSQxMCQ5ZDRGVFNWajQ2bkM4LncvZjJORUxPeU4xcmVqY292YWVwRXg0dll0TGRSMjRzd2VDV0VPNiIsIl9pZCI6IjY0MjU0NDVkMTdkOGNlNTU4NzEzMGRhYSIsIl9fdiI6MH0sImlhdCI6MTY4MDE2MzkzMywiZXhwIjoxNjgwMTcxMTMzfQ.igfQvU28FA6-ILeXe0_B4fbzoGPj2UdisHPJqFQWPbE"

describe("/products",()=>{
    it("should find the whole list of products",(done)=>{
        request(app)
        .get("/api/products")
        .set({
            Authorization:token
        })
        .expect(200,done);
    });

    it("should return product using id",(done)=>{
        request(app)
        .get("/api/products/640efc3651ade56e2d1ca12e")
        .set({
            Authorization:token
        })
        .expect(200,done);
    });

    it("should post a new products",(done)=>{
        request(app)
        .post("/api/products")
        .set({
            Authorization:token
        })
        .send({
            pid:125,
            title:"kuchh Bhi",
            price:332,
            category:"ptaa nahi",
            description:"a vey bad product",
            image:"https://fileinfo.com/img/ss/xl/jpg_44.png"
        })
        .expect(201,done)
    })

    it("should update the product detail",(done)=>{
        request(app)
        .put("/api/products/6425591159cdf0a0b51a0241")
        .set({
            Authorization:token
        })
        .send({
            pid:117,
            title:"kuchh Bhi",
            price:332,
            category:"ptaa nahi bhai",
            description:"a vey bad product",
            image:"https://fileinfo.com/img/ss/xl/jpg_44.png"
        })
        .expect(200,done)
    })

    it("should delete the products",(done)=>{
        request(app)
        .delete("/api/products/640ef450aabb3df304ab28a0")
        .set({
            Authorization:token
        })
        .expect(200,done)
    })

})

