const app = require('../../src/index')
const request = require('supertest')(app)
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const generateToken = require('../../src/utils')

const User = require('../../src/models/User')

describe('Users tests API', () => {

    const rawPassword = '123'
    const invalidPassword = '12'
    let userCreated

    const user = {
        name: 'Reginaldo',
        email: 'reginaldo@gmail.com',
        password_hash: '123'
    }


    beforeAll(async () => {
        await mongoose.connect(process.env.APP_DB_TEST_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(conn => console.log("Connected MongoDB!"))
            .catch(err => console.log("Error connecting to MongoDB Database!"))
    })

    beforeEach(async () => {
        jest.setTimeout(20000);
        await User.deleteMany({})
        userCreated = await User.create(user)
    })



    it('should register user', async () => {
        const response = await request
            .post("/vuttr-api/register")
            .send({
                name: 'Joao',
                email: 'joao@gmail.com',
                password_hash: '123'
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    })

    it('should not register user already exists', async () => {
        const response = await request
            .post("/vuttr-api/register")
            .send({
                name: userCreated.name,
                email: userCreated.email,
                password_hash: userCreated.password_hash
            })

        expect(response.status).toBe(400)
    })

    it('should failed registration when request is invalid', async () => {
        const response = await request
            .post("/vuttr-api/register")
            .send({
                name: 'User'
            })

        expect(response.status).toBe(400)
    })

    it('should not authenticate when user not found', async () => {
        const response = await request
            .post("/vuttr-api/authenticate")
            .send({
                email: 'josedasilva@gmail.com',
                password_hash: rawPassword
            })

        expect(response.status).toBe(404)
    })

    it('should authenticate user with valid credentials', async () => {
        const response = await request
            .post("/vuttr-api/authenticate")
            .send({
                email: userCreated.email,
                password_hash: rawPassword
            })

        expect(response.status).toBe(200)
    })

    it('should not authenticate user with an invalid credentials', async () => {
        const response = await request
            .post("/vuttr-api/authenticate")
            .send({
                email: userCreated.email,
                password_hash: invalidPassword
            })

        expect(response.status).toBe(400)
    })

    it('should return jwt token when authenticated', async () => {
        const response = await request
            .post("/vuttr-api/authenticate")
            .send({
                email: userCreated.email,
                password_hash: rawPassword
            })

        expect(response.body).toHaveProperty('token')
    })



    afterEach(async () => {
        await User.deleteMany({})
    })

    afterAll(async () => {
        //console.log("Desconectando...")
        await mongoose.connection.close()
        //console.log("Desconectou!!!!")
    })

})