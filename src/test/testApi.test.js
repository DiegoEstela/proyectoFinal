const request = require("supertest")("http://localhost:8080");

const expect = require("chai").expect;

describe(" Get - /", () => {
  it("deberia devolver un 200", async () => {
    let response = await request.get("/");
    expect(response.status).to.equal(200);
  });
});

describe(" Get - /productos", () => {
  it("deberia devolver un 200", async () => {
    let response = await request.get("/productos");
    expect(response.status).to.equal(200);
  });
});

describe(" Getprod - /productos", () => {
  it("deberia devolver los productos", async () => {
    let response = await request.get("/productos");
    expect(response.body).to.be.an("array");
    console.log(response.body);
  });
});
