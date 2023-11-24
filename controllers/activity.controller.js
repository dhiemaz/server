'use strict';

const pino = require("pino");
const logger = pino({level: 'info'})
const {
    insertComment,
    getCommentByCommentId,
    getCommentFromUserId,
    getCommentToUserId,
    autoIncrementCommentLikes
} = require('../services/comment.service')
const {responseMessage, responseData, responseView} = require("../utils/response");

/**
 * sendLikes
 * @type {sendLikes}
 */
const sendLikes = ((req, res) => {
    logger.info(`like for comment: ${req.params.id}`);
    autoIncrementCommentLikes()
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
 * sendComment
 * @type {sendComment}
 */
const sendComment = ((req, res) => {
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
 * getComment
 * @type {getComment}
 */
const getComment = ((req, res) => {
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
 * voteComment
 * @type {voteComment}
 */
const voteComment = ((req, res) => {
    logger.info('view dashboard profile');
    try {
        let profile = viewProfile();
        responseView(res, profile)
    } catch (err) {
        logger.error(`failed view dashboard profile, error: ${err}`);
    }
})

module.exports = {
    sendLikes,
    sendComment,
    getComment,
    voteComment
}