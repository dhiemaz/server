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
const findProfile = (async (req, res) => {
    logger.info(`get profile by id: ${req.params.id}`);
    await getProfile(req.params.id).then(function (profile) {
        if (profile) {
            responseMessage(res, 200, 'success', profile);
        } else {
            responseMessage(res, 404, 'not found',profile);
        }
    }).catch(function (err) {
        responseMessage(res, 500, `failed find profile with id: ${req.params.id}, ${err}.`, null);
    });
})

/**
 * getAllProfiles record
 * @type {getAllProfiles}
 */
const getAllProfiles = (async (req, res) => {
    logger.info('get all profile records');
    await getProfiles().then(function (profile) {
        if (profile) {
            responseMessage(res, 200, 'success', profile);
        } else {
            responseMessage(res, 404, 'not found', profile);
        }
    }).catch(function (err) {
        responseMessage(res, 500, `failed get all profiles, ${err}.`, null);
    });
})

/**
 * createProfile new
 * @type {createProfile}
 */
const createProfile = (async (req, res) => {
    let data = {...req.body}
    logger.info(`create a new profile, data: ${data}`);

    await insertProfile(data).then(function (result) {
        responseMessage(res, 201, 'success', result);
    }).catch(function (err) {
        responseMessage(res, 422, err.toString());
    });
})

/**
 * viewDashboardProfile
 * @type {viewDashboardProfile}
 */
const viewDashboardProfile = (async (req, res) => {
    logger.info(`view dashboard profile by id: ${req.params.id}`);
    await getProfile(req.params.id).then(function (profile) {
        if (profile) {
            responseView(res, 200, profile);
        } else {
            responseView(res, 404, null);
        }
    }).catch(function (err) {
        responseView(res, 500, null);
    });
})

module.exports = {
    findProfile,
    getAllProfiles,
    createProfile,
    viewDashboardProfile
};