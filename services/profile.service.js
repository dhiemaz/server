const pino = require('pino');
const logger = pino({level: 'info'});
const {Profile} = require('../models/profile.model')
const mongoose = require("mongoose");

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
        throw Error(err);
    }
});

/**
 * getProfile by id
 * @type {(function(*): Promise<(Query<Document<any, any, unknown> & {}, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getProfile = (async (id) => {
    try {
        let result = await Profile.findOne({_id: mongoose.Types.ObjectId(id)});
        logger.info(`get profile with id: ${id}, result: ${result}`);
        return result
    } catch (err) {
        logger.error(`failed get profile with id: ${id}, error: ${err}`)
        throw Error(err);
    }
});

const getProfiles = (async () => {
    let result = null;
    try {
        result = await Profile.find({});
        logger.info(`get all profile records, result: ${result}`);
        return result;
    } catch (err) {
        logger.error(`failed get all profile records, error: ${err}`)
        throw Error(err);
    }
});

module.exports = {
    insertProfile,
    getProfiles,
    getProfile
}