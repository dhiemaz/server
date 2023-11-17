'use strict';

const pino = require("pino");
const logger = pino({level: 'info'})
const {
    insertProfile,
    getProfiles,
    viewProfile
} = require('../services/profile.service')
const {responseMessage, responseData, responseView} = require("../utils/response");

// getProfiles from in-memory
const viewProfiles = ((req, res) => {
    logger.info('called getProfiles');
    getProfiles(req.params.id).then(function (profile) {
        logger.info('get profile-id : ', req.params.id);
        if (profile) {
            responseData(res, 200, profile);
        } else {
            responseData(res, 404, profile);
        }
    }).catch(function (err) {
        logger.error('failed get profile-id :', req.params.id, 'error: ', err)
    });
})

// createProfile
const createProfile = ((req, res) => {
    let data = {...req.body}
    logger.info('called insertProfile with payload : ', req.body);
    try {
        insertProfile(data);
        responseMessage(res, 201, 'user profile successfully created.');
    } catch (err) {
        responseMessage(res, 422, 'Failed create profile');
    }

})

// viewDashboardProfile
const viewDashboardProfile = ((req, res) => {
    logger.info('called viewProfile');
    viewProfile().then(function (profile) {
        responseView(res, profile)
    }).catch(function (err) {
        logger.error('failed viewProfile, error: ', err)
    });
})

module.exports = {
    viewProfiles,
    createProfile,
    viewDashboardProfile
}