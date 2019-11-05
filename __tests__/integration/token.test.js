const app = require('../../src/index')
const request = require('supertest')(app)
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const generateToken = require('../../src/utils')
const Tools = require('../../src/models/Tools')

describe('Tools Tests API', () => {

    const tool = {
        title: "hotel",
        link: "https://github.com/typicode/hotel",
        description: "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
        tags: ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
    }

    let toolCreated
    let token

    beforeAll(async () => {
        await mongoose.connect(process.env.APP_DB_TEST_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(conn => console.log("Connected MongoDB!"))
            .catch(err => console.log("Error connecting to MongoDB Database!"))
        token = generateToken()
    })

    beforeEach(async () => {
        jest.setTimeout(30000);
        await Tools.deleteMany({})
        toolCreated = await Tools.create(tool)
    })

    it('should receive 200 OK when access a route who needs authentication using a valid jwt', async () => {
        const response = await request
            .get('/vuttr-api/tools')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
    })

    it('should receive 401 Unauthorized when access a route who needs authentication without token', async () => {
        const response = await request
            .get('/vuttr-api/tools')

        expect(response.status).toBe(401)
    })

    it('should not be able to access private routes with invalid jwt token', async () => {
        const response = await request
            .get('/vuttr-api/tools')
            .set('Authorization', `Bearer 123123`)

        expect(response.status).toBe(401)
    })

    it('should not be able to access private routes with jwt token that has no 2 parts', async () => {
        const response = await request
            .get('/vuttr-api/tools')
            .set('Authorization', `3123`)

        expect(response.status).toBe(401)
    })

    it('should not be able to access private routes with jwt token that has no Bearer word', async () => {
        const response = await request
            .get('/vuttr-api/tools')
            .set('Authorization', `Bearerr 3123`)

        expect(response.status).toBe(401)
    })

    it('should return all tools when access GET with a valid token', async () => {
        const response = await request
            .get('/vuttr-api/tools')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.docs[0].title).toBe('hotel')
        expect(response.body.docs[0]).toHaveProperty('title', 'hotel')
    })

    it('should return all tools with paginate fields when access GET with a valid token', async () => {
        const response = await request
            .get('/vuttr-api/tools')
            .set('Authorization', `Bearer ${token}`)

        expect(response.body).toHaveProperty('limit')
        expect(response.body).toHaveProperty('page')
    })

    afterEach(async () => {
        await Tools.deleteMany({})
    })

    afterAll(async () => {        
        await mongoose.connection.close()        
    })

})