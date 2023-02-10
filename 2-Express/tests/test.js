
const { it } = require('mocha')
var pactum = require('pactum')
describe("api test", () => {
    it("should list five people", async () => {
        let spec = pactum.spec();
        await spec
            .get('http://localhost:5000/api/people')
            .expectJsonLike({
                data: [{
                    "id": 1,
                    "name": "john"
                }]
            })
            .expectJson({
                data: [{
                    "id": 1,
                    "name": "john"
                }]
            })
            .expectStatus(200)
            .withRequestTimeout(3000)
    })
    it("should add a person ", async () => {
        let spec = pactum.spec();
        await spec
            .post('http://localhost:5000/api/people')
            .withBody({ "name": "john" })
            .expectStatus(201)
            .withRequestTimeout(3000)

    })
    it("should not add a person", async () => {
        let spec = pactum.spec();
        await spec
            .post('http://localhost:5000/api/people')
            .withBody({})
            .expectStatus(400)
            .withRequestTimeout(3000)

    })
    it("should login", async () => {
        let spec = pactum.spec();
        await spec
            .post('http://localhost:5000/login')
            .withBody({ "name": "john" })
            .expectStatus(200)
            .withRequestTimeout(3000)

    })
    it("should not login", async () => {
        let spec = pactum.spec();
        await spec
            .post('http://localhost:5000/login')
            .withBody({})
            .expectStatus(401)
            .withRequestTimeout(3000)

    })
    it("should update a person", async () => {
        let spec = pactum.spec();
        await spec
            .put(`http://localhost:5000/api/people/${1}`)
            .withBody({ "name":"Jane"  })
            .expectStatus(200)
            .expectJsonLike({
                success: true,
                data: [{
                    "id": 1,
                    "name": "Jane"
                }]
            })
            .withRequestTimeout(3000)
    })
    
    it("should return error if person not found when updating", async () => {
        let spec = pactum.spec();
    
        await spec
            .put(`http://localhost:5000/api/people/${100}`)
            .withBody({ "name": "Jane" })
            .expectStatus(404)
            .expectJsonLike({
                success: false,
                msg: `no person with id ${100}`
            })
            .withRequestTimeout(3000)
    })
    
    it("should delete a person successfully", async () => {
        let spec = pactum.spec();
        await spec
            .delete(`http://localhost:5000/api/people/${1}`)
            .expectStatus(200)
            .expectJsonLike({
                success: true,
                data: []
            })
            .withRequestTimeout(3000)
    })
    
    it("should return error if person not found when deleting", async () => {
        let spec = pactum.spec();
        await spec
            .delete(`http://localhost:5000/api/people/${100}`)
            .expectStatus(404)
            .expectJsonLike({
                success: false,
                msg: `no person with id ${100}`
            })
            .withRequestTimeout(3000)
    })
    


})