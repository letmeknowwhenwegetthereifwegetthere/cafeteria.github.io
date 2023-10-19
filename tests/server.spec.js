const request = require("supertest");
const server = require("../index");
const supertest = require("supertest");

describe("Operaciones CRUD de cafes", () => {

    it("GET /cafes", async () => {
        const res = await supertest(server).get("/cafes").send();
        const cafe = res.body;
        //console.log(res);
        //console.log(cafe);
        expect(res.statusCode).toEqual(200);
        //tipo de dato recibido es un arreglo con por lo menos un objeto
        expect(cafe).toBeInstanceOf(Array);
        expect(cafe.length).toBeGreaterThanOrEqual(1);
    });

    it("404 al intentar eliminar un cafe que no existe", async () => {
        const jwt = "1234567890";
        const idDeProductoAEliminar = 1000;
        const res = await supertest(server)
        .delete(`/cafes/${idDeProductoAEliminar}`)
        .set("Authorization", jwt)
        .send();
        //console.log(res.statusCode);
        expect(res.statusCode).toEqual(404);
    }
    );

    it("POST /cafes agregar un cafe y devuelve codigo 201", async () => {
        const cafe = {
            id: 1000,
            nombre: "Cafe de prueba"
        };
        const res = await supertest(server).post("/cafes").send(cafe);
        //console.log(res);
        expect(res.statusCode).toEqual(201);
    });

    it("PUT /cafes/:id devuelve codigo 400 si el id del cafe no coincide con el id del parametro", async () => {
        const cafe = {
            id: 1000,
            nombre: "Cafe de prueba"
        };
        const res = await supertest(server).put("/cafes/1").send(cafe);
        //console.log(res);
        expect(res.statusCode).toEqual(400);
    });

});