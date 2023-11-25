'use strict';

const pino = require("pino");
const logger = pino({level: 'info'})
const {
    insertComment,
    getCommentByCommentId,
    getCommentFromUserId,
    getCommentToUserId,
    likesComment
} = require('../services/comment.service')
const {responseMessage, responseData, responseView} = require("../utils/response");

/**
 * sendLikes
 * @type {sendLikes}
 */
const sendLikes = ((req, res) => {
    logger.info(`${req.params.act} for comment: ${req.params.id}`);
    likesComment(req.params.id, req.params.act).then(function (result) {
        if (result) {
            responseMessage(res, 200, 'success', result);
        } else {
            responseMessage(res, 422, 'failed', result);
        }
    }).catch(function (err) {
        logger.error(`failed send ${req.params.act} to comment: ${req.params.id}, error: ${err}`)
        responseMessage(res, 500, err.toString())
    });
})

/**
 * sendComment
 * @type {sendComment}
 */
const sendComment = ((req, res) => {
    logger.info('get all profile records');
    let data = {...req.body}
    insertComment(data).then(function (result) {
        if (result) {
            responseMessage(res, 200, 'success', result);
        } else {
            responseMessage(res, 422, 'failed', result);
        }
    }).catch(function (err) {
        logger.error(`failed post comment, error: ${err}`)
        responseMessage(res, 500, err.toString())
    });
})

/**
 * getCommentFrom
 * @type {getCommentFrom}
 */
const getCommentFrom = ((req, res) => {
    logger.info(`get for comment from: ${req.params.id}`);
    getCommentFromUserId(req.params.id).then(function (result) {
        if (result) {
            responseMessage(res, 200, 'success', result);
        } else {
            responseMessage(res, 404, 'not found', result);
        }
    }).catch(function (err) {
        responseMessage(res, 500, err.toString());
    });
})

/**
 * getCommentTo
 * @type {getCommentTo}
 */
const getCommentTo = ((req, res) => {
    logger.info(`get for comment to: ${req.params.id}`);
    getCommentToUserId(req.params.id).then(function (result) {
        if (result) {
            responseMessage(res, 200, 'success', result);
        } else {
            responseMessage(res, 404, 'not found', result);
        }
    }).catch(function (err) {
        responseMessage(res, 500, err.toString());
    });
})

module.exports = {
    sendLikes,
    sendComment,
    getCommentFrom,
    getCommentTo
}