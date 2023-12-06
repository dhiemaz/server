const app = require("../app")
const dbHandler = require('../database/mongo.database');
const profileController = require('../controllers/profile.controller');
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

describe('profile test suite - positive case', () => {
    let err = null;

    it('can be created successfully', async () => {
        return request(app)
            .post("/profile")
            .send(profileData)
            .expect(201)
    })
});
