const app = require("../app")
const dbHandler = require('../database/mongo.database');
const profileController = require('../controllers/profile.controller');


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

describe('profile test suite', () => {
    let err = null;

    it('can be created successfully', async () => {
        let mReq = {};
        return request(app)
            .post("/profile")
            .send(mReq)
            .expect(422)
    })
});
