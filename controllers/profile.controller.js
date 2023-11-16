'use strict';

const pino = require("pino");
const logger = pino({level: 'info'})
const {
    insertProfile,
    getProfiles,
    viewProfile
} = require('../models/profile.model')

// getProfiles from in-memory
const viewProfiles = ((req, res) => {
    logger.info('called viewProfiles');
    getProfiles(res, req.params.id).then(function () {
        logger.info('get profile-id : ', req.params.id);
    }).catch(function (err) {
        logger.error('failed get profile-id :', req.params.id, 'error: ', err)
    });
})

// createProfile
const createProfile = ((req, res) => {
    let data = {...req.body}
    logger.info('called createProfile, payload : ', req.body);
    insertProfile(res, data);
})

// viewDashboardProfile
const viewDashboardProfile = ((req, res) => {
    logger.info('called viewDashboardProfile');
    viewProfile(res);
})

module.exports = {
    viewProfiles,
    createProfile,
    viewDashboardProfile
}