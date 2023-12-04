
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

describe('user test suite - positive case', () => {
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

    it('can check user exist', async () => {
        let isExist = false;

        await userService.isUserExist(savedUser._id).then( result => {
            isExist = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(isExist).toBe(true);
        });
    })

    it('can get user data', async () => {
        let user = null;

        await userService.getUser(savedUser._id).then( result => {
            user = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(user.name).toBe(userData.name);
        });
    })
});

describe('user test suite - negative case', () => {
    let savedUser = null;
    let err = null;

    it('can check user because user not exist', async () => {
        let isExist = false;

        await userService.isUserExist('656e0ca1f093350d038ff9c7').then( result => {
            isExist = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(isExist).toBe(false);
        });
    })

    it('cannot get user data because user not exist', async () => {
        let user = null;

        await userService.getUser('656e0ca1f093350d038ff9c7').then( result => {
            user = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err.toString()).toBe(`user 656e0ca1f093350d038ff9c7 not found.`);
        });
    })
});