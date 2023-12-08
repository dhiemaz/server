'use strict';

const pino = require("pino");
const logger = pino({level: 'info'})
const {
    insertComment,
    getCommentByCommentId,
    getCommentFrom,
    getCommentTo,
    likesComment
} = require('../services/comment.service')
const {responseMessage, responseData, responseView} = require("../utils/response");

/**
 * likeUnlikeComment
 * @type {likeUnlikeComment}
 */
const likeUnlikeComment = (async (req, res) => {
    logger.info(`${req.params.act} for comment: ${req.params.id}`)
    if (req.params.act === 'like' || req.params.act === 'unlike') {
        await likesComment(req.params.id, req.params.act).then(function (result) {
            responseMessage(res, 200, 'success', result);
        }).catch(function (err) {
            responseMessage(res, 422, `failed send ${req.params.act} to comment: ${req.params.id}, ${err}`, null);
        });
    } else {
        responseMessage(res, 422, `failed send ${req.params.act} to comment: ${req.params.id}, not recognized action [${req.params.act}]`, null);
    }
})

/**
 * sendComment
 * @type {sendComment}
 */
const sendComment = ((req, res) => {
    logger.info('posting comment');
    let data = {...req.body}
    insertComment(data).then(function (result) {
        responseMessage(res, 200, 'success', result);
    }).catch(function (err) {
        responseMessage(res, 422, `failed post comment, ${err}`, null);
    });
})

/**
 * viewCommentFrom
 * @type {viewCommentFrom}
 */
const viewCommentFrom = (async (req, res) => {
    logger.info(`get comment from: ${req.params.id}`);
    await getCommentFrom(req.params.id).then(function (result) {
        responseMessage(res, 200, 'success', result);
    }).catch(function (err) {
        responseMessage(res, 500, `failed get comment from ${req.params.id}, ${err}`, null);
    });
})

/**
 * viewCommentTo
 * @type {viewCommentTo}
 */
const viewCommentTo = (async (req, res) => {
    let sortBy = req.query.sortby;
    let page = req.query.page;
    let limit = req.query.limit;

    if (sortBy === undefined) {
        sortBy = "best"; // set default sortBy best (sort by most number of likes).
    }

    const filter = {
        mbti: (!(req.query.mbti === undefined || req.query.mbti.toLowerCase() === 'false')),
        enneagram: (!(req.query.enneagram === undefined || req.query.enneagram.toLowerCase() === 'false')),
        zodiac: (!(req.query.zodiac === undefined || req.query.zodiac.toLowerCase() === 'false'))
    }

    if (sortBy === "best" || sortBy === "recent") {
        logger.info(`get comment to: ${req.params.id} with sortby: ${sortBy}`);
        await getCommentTo(req.params.id, sortBy, filter, page, limit).then(function (result) {
            if (result) {
                responseMessage(res, 200, 'success', result);
            } else {
                responseMessage(res, 404, 'not found', result);
            }
        }).catch(function (err) {
            responseMessage(res, 500, `failed get comment to ${req.params.id}, ${err}`, null);
        });
    } else {
        responseMessage(res, 422, `unrecognized sortby: [${sortBy}]`, null);
    }
})

module.exports = {
    likeUnlikeComment,
    sendComment,
    viewCommentFrom,
    viewCommentTo
}