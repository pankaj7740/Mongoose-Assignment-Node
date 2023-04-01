import chai,{assert,expect} from "chai"
import {describe,it} from "mocha"
import chaiHttp from 'chai-http';
import {app} from "../index"
import request from "supertest"
import {addition} from "../src/config";



chai.use(chaiHttp);

describe("Calculator Test",()=>{
  it("should return 5 when added to 2 and 3",()=>{
    const result = addition(2,3);
    assert.equal(result, 5);
  });
  it("should return 8 when added to 5 and 3",()=>{
    const result = addition(5,3);
    assert.equal(result, 8);
  })
})
describe ("summation test",()=>{
  it("should return 10 when added to 6 and 4",()=>{
    const result = addition(6,4);
    expect(result).to.equal(10);
  })
});

describe("/farm/:id",()=>{
  it("should retuen a particular farm",(done)=>{
  request(app)
  .get("/api/farm/641177d2101d6dbb8c6441d8")
  .expect(200,done)  
  })
})

describe("/farm",()=>{
  it("should post the farmer name",(done)=>{
    request(app)
    .post("/api/farm")
    .send({
      name: "raman",
      heads: [],
    })
    .expect(201,done)
  })
})




