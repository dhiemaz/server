const dbHandler = require('../database/mongo.database')
const profileService = require('../services/profile.service')
const mongoose = require('mongoose');

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
afterAll(async () => await dbHandler.disconnectDB());

describe('profile test', () => {
    let savedProfile = null;
    /**
     * tests that valid profile can be created through profile services with success
     */
    it('can be created successfully', async () => {
        savedProfile = await profileService.insertProfile(profileData);
        expect(savedProfile.name).toBe(profileData.name)
    })

    it('can be retrieved successfully', async () => {
        const {_id} = savedProfile;
        const result = await profileService.getProfiles(_id);
        expect(result.name).toBe(profileData.name);
    })
});