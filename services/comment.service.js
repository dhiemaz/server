const pino = require('pino');
const logger = pino({level: 'info'});
const {Comment} = require('../models/comment.model')

/**
 * insertComment from user to another user
 * @type {(function(*): Promise<(Document<any, any, unknown> & {})|*|undefined>)|*}
 */
const insertComment = (async (data) => {
    const newComment = new Comment({
        from: data.from,
        to: data.to,
        title: data.title,
        comment: data.comment,
        likes: 0
    })
    try {
        const result = await newComment.save();
        logger.info(`insert new comment from id: ${data.from} for id: ${data.to}`);
        return result;
    } catch (err) {
        logger.error(`insert new comment from id: ${data.from} for id: ${data.to}, error: ${err}`);
        throw Error(err);
    }
});

/**
 * getCommentByCommentId
 * @type {(function(*): Promise<(Query<any, any, {}, any> & {})|*|undefined>)|*}
 */
const getCommentByCommentId = (async (id) => {
    try {
        const result = await Comment.findById(id);
        logger.info(`successfully get comment by comment id: ${id}`);
        return result
    } catch (err) {
        logger.error(`failed get comment by comment id: ${id}, error: ${err}`)
        throw Error(err);
    }
});

/**
 * getCommentFromUserId
 * @type {(function(*): Promise<(Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getCommentFromUserId = (async (id) => {
    try {
        const result = await Comment.find({from: id});
        logger.info(`successfully get comment from user: ${id}, result: ${result}`);
        return result
    } catch (err) {
        logger.error(`failed get comment from user: ${id}, error: ${err}`)
        throw Error(err);
    }
});

/**
 * getCommentToUserId
 * @type {(function(*): Promise<(Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getCommentToUserId = (async (id, sortby) => {
    let result = null;
    try {
        if (sortby === 'recent') {
            result = await Comment.find({to: id}).sort({'created_at':'desc'});
            logger.info(`successfully get comment to user: ${id} sortby: ${sortby}`);
        } else {
            result = await Comment.find({to: id}).sort({'likes':-1});
            logger.info(`successfully get comment to user: ${id} sortby: ${sortby}`);
        }
        return result
    } catch (err) {
        logger.error(`failed get comment to user: ${id}, error: ${err}`)
        throw Error(err);
    }
});

/**
 * likesComment
 * @type {(function(*, *): Promise<Error|(Query<Document<any, any, unknown> & {}, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const likesComment = (async (id, action) => {
    const counter = action === 'like' ? 1 : -1;
    try {
        let result = await Comment.findOneAndUpdate(
            {id: id},
            {$inc: {likes: counter}},
            {new: true, useFindAndModify: false})

        if (result === null) {
            return null;
        }

        logger.info(`successfully ${action} comment id: ${id}, result: ${result}`);
        return result;
    } catch (err) {
        logger.error(`failed ${action} comment id: ${id}, error: ${err}`)
        throw Error(err);
    }
})

module.exports = {
    insertComment,
    getCommentByCommentId,
    getCommentFromUserId,
    getCommentToUserId,
    likesComment
}