'use strict';

const pino = require("pino");
const logger = pino({level: 'info'});
const {
    insertProfile,
    getProfiles,
    getProfile
} = require('../services/profile.service');
const {responseMessage, responseData, responseView} = require("../utils/response");

/**
 * viewProfile by id
 * @type {viewProfile}
 */
const viewProfile = (async (req, res) => {
    logger.info(`view profile id: ${req.params.id}`);
    await getProfile(req.params.id).then(function (profile) {
        if (profile) {
            if (req.is('application/json')) {
                responseMessage(res, 200, 'success', profile);
            } else {
                responseView(res, 200, profile);
            }
        } else {
            if (req.is('application/json')) {
                responseMessage(res, 404, 'not found',profile);
            } else {
                responseView(res, 404, null);
            }
        }
    }).catch(function (err) {
        if (req.is('application/json')) {
            responseMessage(res, 500, `failed find profile with id: ${req.params.id}, ${err}.`, null);
        } else {
            responseView(res, 404, null);
        }
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

module.exports = {
    getAllProfiles,
    createProfile,
    viewProfile
};