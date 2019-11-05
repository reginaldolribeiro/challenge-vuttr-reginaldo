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
    
    

    it('should return a tool when passing a valid tag', async () => {
        const tag = toolCreated.tags[0]

        const response = await request
            .get(`/vuttr-api/tools?tag=${tag}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.docs[0]).toHaveProperty('title', 'hotel')
    })

    it('should not return a tool when passing a invalid tag', async () => {
        const invalidTag = toolCreated.tags[0] + '1'

        const response = await request
            .get(`/vuttr-api/tools?tag=${invalidTag}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
    })

    it('should return a tool when passing a valid ID', async () => {
        const response = await request
            .get(`/vuttr-api/tools/${toolCreated._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('hotel')
    })

    it('should not return a tool when passing a invalid ID', async () => {
        const invalidId = toolCreated._id + '1'

        const response = await request
            .get(`/vuttr-api/tools/${invalidId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
    })

    it('should not return a tool when passing a inexistent ID', async () => {
        const someId = mongoose.Types.ObjectId()

        const response = await request
            .get(`/vuttr-api/tools/${someId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
    })

    it('should create a tool', async () => {
        const response = await request
            .post('/vuttr-api/tools')
            .send({
                title: tool.title,
                link: tool.link,
                description: tool.description,
                tags: tool.tags
            })
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body.title).toBe('hotel')
    })

    it('should not create a tool when invalid params', async () => {
        const response = await request
            .post('/vuttr-api/tools')
            .send({
                link: tool.link,
                description: tool.description,
                tags: tool.tags
            })
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
    })

    it('should update a tool', async () => {
        const response = await request
            .put(`/vuttr-api/tools/${toolCreated._id}`)
            .send({
                title: 'hotel changed'
            })
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.title).toBe('hotel changed')
        expect(response.body.link).toBe(toolCreated.link)
    })

    it('should not update a tool when ID is not passed', async () => {
        let invalidId = null

        const response = await request            
            .put(`/vuttr-api/tools/${invalidId}`)
            .send({
                title: 'hotel changed'
            })
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
    })

    it('should not update a tool when passing invalid ID', async () => {
        const invalidId = '34431'

        const response = await request
            .put(`/vuttr-api/tools/${invalidId}`)
            .send({
                title: 'hotel changed'
            })
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
    })

    it('should delete a tool', async () => {
        const response = await request
            .delete(`/vuttr-api/tools/${toolCreated._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(204)
    })

    it('should not delete a tool when ID is invalid', async () => {
        const invalidId = toolCreated._id+'87'

        const response = await request
            .delete(`/vuttr-api/tools/${invalidId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
    })

    it('should not delete a tool when ID is not passed', async () => {
        const invalidId = null

        const response = await request
            .delete(`/vuttr-api/tools/${invalidId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
    })



    afterEach(async () => {
        await Tools.deleteMany({})
    })

    afterAll(async () => {
        //console.log("Desconectando...")
        await mongoose.connection.close()
        //console.log("Desconectou!!!!")
    })

})