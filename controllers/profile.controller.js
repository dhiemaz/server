'use strict';

const pino = require("pino");
const logger = pino({level: 'info'})
const {
    insertProfile,
    getProfiles,
    getProfile,
    viewProfile
} = require('../services/profile.service')
const {responseMessage, responseData, responseView} = require("../utils/response");

/**
 * findProfile by id
 * @type {findProfile}
 */
const findProfile = ((req, res) => {
    logger.info(`get profile by id: ${req.params.id}`);
    getProfile(req.params.id).then(function (profile) {
        if (profile) {
            responseData(res, 200, profile);
        } else {
            responseData(res, 404, profile);
        }
    }).catch(function (err) {
        logger.error(`failed get profile by id: ${req.params.id}, error: ${err}`)
    });
})

/**
 * getAllProfiles record
 * @type {getAllProfiles}
 */
const getAllProfiles = ((req, res) => {
    logger.info('get all profile records');
    getProfiles().then(function (profile) {
        if (profile) {
            responseData(res, 200, profile);
        } else {
            responseData(res, 404, profile);
        }
    }).catch(function (err) {
        logger.error(`failed get all profile records, error: ${err}`)
    });
})

/**
 * createProfile new
 * @type {createProfile}
 */
const createProfile = ((req, res) => {
    let data = {...req.body}
    logger.info(`create a new profile, data: ${data}`);
    try {
        insertProfile(data);
        responseMessage(res, 201, 'new profile successfully created.');
    } catch (err) {
        responseMessage(res, 422, 'failed create new profile');
    }
})

/**
 * viewDashboardProfile
 * @type {viewDashboardProfile}
 */
const viewDashboardProfile = ((req, res) => {
    logger.info('view dashboard profile');
    try {
        let profile = viewProfile();
        responseView(res, profile)
    } catch (err) {
        logger.error(`failed view dashboard profile, error: ${err}`);
    }
})

module.exports = {
    findProfile,
    getAllProfiles,
    createProfile,
    viewDashboardProfile
}