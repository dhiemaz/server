const pino = require('pino');
const logger = pino({level: 'info'});
const {Profile} = require('../models/profile.model')
const dummyProfile = require('../models/fixtures/profile.dummy.model')

/**
 * insertProfile user
 * @type {(function(*): Promise<(Document<any, any, unknown> & {})|*|undefined>)|*}
 */
const insertProfile = (async (data) => {
    let newProfile = new Profile({
        name: data.name,
        description: data.description,
        mbti: data.mbti,
        enneagram: data.enneagram,
        variant: data.variant,
        tritype: data.tritype,
        socionics: data.socionics,
        sloan: data.sloan,
        psyche: data.psyche,
        image: 'https://soulverse.boo.world/images/1.png'
    })
    try {
        let result = await newProfile.save();
        logger.info(`creating new profile with id: ${result._id}`);
        return result;
    } catch (err) {
        logger.error(`failed create new profile, error: ${err}`);
        return err;
    }
});

/**
 * getProfile by id
 * @type {(function(*): Promise<(Query<Document<any, any, unknown> & {}, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getProfile = (async (id) => {
    try {
        let result = await Profile.findById(id);
        logger.info(`get profile with id: ${id}, result: ${result}`);
        return result
    } catch (err) {
        logger.error(`failed get profile with id: ${id}, error: ${err}`)
        return err;
    }
});

const getProfiles = (async () => {
    try {
        let result = await Profile.find({});
        logger.info(`get all profile records, result: ${result}`);
        return result
    } catch (err) {
        logger.error(`failed get all profile records, error: ${err}`)
        return err;
    }
});

/**
 * viewProfile from dummy profile
 * @type {function(): {psyche: string, image: string, sloan: string, enneagram: string, name: string, variant: string, description: string, mbti: string, id: number, tritype: number, socionics: string}}
 */
const viewProfile = (() => {
    logger.info(`get profiles using dummy profile data, result: ${dummyProfile.profiles[0]}`);
    return dummyProfile.profiles[0];
});

module.exports = {
    insertProfile,
    getProfiles,
    getProfile,
    viewProfile
}