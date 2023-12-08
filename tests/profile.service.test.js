const dbHandler = require('../database/mongo.database')
const profileService = require('../services/profile.service')
const util = require('util');

/**
 * profileData example
 * @type {{psyche: string, sloan: string, enneagram: string, name: string, variant: string, description: string, mbti: string, id: number, tritype: number, socionics: string}}
 */
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
}

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
    let savedProfile = null;
    let err = null;
    /**
     * tests that valid profile can be created through profile services with success
     */
    it('can be created successfully', async () => {
        await profileService.insertProfile(profileData).then(function (result) {
            savedProfile = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(savedProfile.name).toBe(profileData.name)
        });
    })

    it('retrieve single profile successfully', async () => {
        let err = null;
        let profile = null;
        const {_id} = savedProfile;

        await profileService.getProfile(_id).then(function (result) {
            profile = result
        }).catch(function (e) {
            err = e;
        }).finally(function (){
            expect(err).toBeNull();
            expect(profile.name).toBe(profileData.name);
        });
    })

    it('retrieve all profile records successfully', async () => {
        let profiles = null;
        let err = null;

        await profileService.getProfiles().then(function (result){
            profiles = result
        }).catch(function (e) {
            err = e;
        }).finally(function (){
            expect(err).toBeNull();
            expect(profiles.length).toBe(1);
        });
    })
});

describe('profile test suite - negative case', () => {
    let err = null;

    it('retrieve all profile records failed, no data', async () => {
        let profiles = null;
        let err = null;

        await dbHandler.clearDB(); // force clean db so it will get the scenario of no data

        await profileService.getProfiles().then(function (result){
            profiles = result
        }).catch(function (e) {
            err = e;
        }).finally(function (){
            expect(err).toBeNull();
            expect(profiles.length).toBe(0);
        });
    })
});