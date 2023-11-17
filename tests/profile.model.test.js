const dbHandler = require('../database/mongo.database')
const profileService = require('../service/profile.service')

/**
 * profileData example
 * @type {{psyche: string, sloan: string, enneagram: string, name: string, variant: string, description: string, mbti: string, id: number, tritype: number, socionics: string}}
 */
const profileData = {
    id: 1,
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
 * clear all test data after every tests
 */
afterEach(async () => await dbHandler.clearDB());

/**
 * remove and close db and server
 */
afterAll(async () => await dbHandler.disconnectDB());

describe('profile ', () => {
    /**
     * tests that valid profile can be created through profile service with success
     */
    it('can be created successfully', async () => {
        expect(async () => await profileService.insertProfile(profileData))
    })
})

