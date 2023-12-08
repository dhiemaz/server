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

describe('profile test suite - positive case', () => {
    const profileData = {
        name: "A Martinez",
        description: "Adolph Larrue Martinez III.",
        mbti: "ISFJ",
        enneagram: "9w3",
        variant: "sp/so",
        tritype: 725,
        socionics: "SEE",
        sloan: "RCOEN",
        psyche: "FEVL"
    };

    let id = null;

    it('can created profile successfully', async () => {
        return request(app)
            .post("/profile")
            .send(profileData)
            .expect(201)
            .then(({ body })=>{
                id = body.data._id;
            })
    })

    it('can get all profile successfully', async () => {
        return request(app)
            .get("/profiles")
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    })

    it('can get single profile (web) successfully', async () => {
        return request(app)
            .get(`/profile/${id}`)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
    })
});

describe('profile test suite - negative case', () => {
    const profileData = {
        name: null,
        description: "Adolph Larrue Martinez III.",
        mbti: "ISFJ",
        enneagram: "9w3",
        variant: "sp/so",
        tritype: 725,
        socionics: "SEE",
        sloan: "RCOEN",
        psyche: "FEVL"
    };

    it('can created profile with failed, mandatory field empty', async () => {
        return request(app)
            .post("/profile")
            .send(profileData)
            .expect(422)
    })

    it('can get all profile with failed, not found (404)', async () => {
        await dbHandler.clearDB(); // force clear database.

        return request(app)
            .get("/profiles")
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
    })

    it('can get single profile (web) with failed, not found (404)', async () => {
        return request(app)
            .get(`/profile/6570b76defd70d4141e285ca`)
            .expect(200)
    })

    it('can get single profile (json) with failed, not found (404)', async () => {
        return request(app)
            .get(`/profile/6570b76defd70d4141e285ca`)
            .set('Content-Type', 'application/json')
            .expect(404)
    });
});
