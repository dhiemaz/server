
const dbHandler = require('../database/mongo.database')
const userService = require('../services/user.service')

const userData = {
    name: "Martinez"
}

/**
 * connect to a new in-memory database before running any test cases
 */
beforeAll(async () => await dbHandler.connectDB());

/**
 * remove and close db and server
 */
afterAll(async () => {
    await dbHandler.disconnectDB()
});

describe('user test suite', () => {
    let savedUser = null;
    let err = null;
    /**
     * tests that valid user can be created through user services with success
     */
    it('can be inserted successfully', async () => {
        await userService.insertUser(userData).then(function (result) {
            savedUser = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(savedUser.name).toBe(userData.name);
        });
    })

    it('failed insert with duplicate error', async () => {
        await userService.insertUser(userData).then(function (result) {
            savedUser = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeInstanceOf(Error);
        });
    })
});