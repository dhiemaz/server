const app = require("../app")
const dbHandler = require('../database/mongo.database');
const request = require("supertest")


/**
 * connect to a new in-memory database before running any test cases
 */
beforeAll(async () => await dbHandler.connectDB());

/**
 * remove and close db and server
 */
afterAll(async () => {
    await dbHandler.clearDB();
    await dbHandler.disconnectDB()
});

describe('user test suite - positive case', () => {
    const userData = {
        name: "A Martinez",
    };

    let id = null;

    it('can created user successfully', async () => {
        return request(app)
            .post("/user")
            .send(userData)
            .expect(201)
            .then(({ body })=>{
                id = body.data._id;
            })
    })

    it('can get user successfully', async () => {
        return request(app)
            .get(`/user/${id}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    })
});

describe('user test suite - negative case', () => {
    const userData = {
        name: null,
    };

    it('can created user with failed, empty mandatory field', async () => {
        return request(app)
            .post("/user")
            .send(userData)
            .expect(422)
    })

    it('can get user with failed, (404) not found', async () => {
        return request(app)
            .get(`/user/6570b76defd70d4141e285ca`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
    })
});

