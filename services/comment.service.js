const pino = require('pino');
const logger = pino({level: 'info'});
const {Comment} = require('../models/comment.model')
const {CounterLikes} = require('../models/comment.likes.counter.model')

/**
 * insertComment from user to another user
 * @type {(function(*): Promise<(Document<any, any, unknown> & {})|*|undefined>)|*}
 */
const insertComment = (async (data) => {
    let newComment = new Comment({
        from: data.from,
        to: data.to,
        title: data.title,
        comment: data.comment,
    })
    try {
        let result = await newComment.save();
        logger.info(`insert new comment from id: ${data.from} for id: ${data.to}`);
        return result;
    } catch (err) {
        logger.error(`insert new comment from id: ${data.from} for id: ${data.to}, error: ${err}`);
        return err;
    }
});

/**
 * getCommentByCommentId
 * @type {(function(*): Promise<(Query<any, any, {}, any> & {})|*|undefined>)|*}
 */
const getCommentByCommentId = (async (id) => {
    try {
        let result = await Comment.findById(id);
        logger.info(`successfully get comment by comment id: ${id}`);
        return result
    } catch (err) {
        logger.error(`failed get comment by comment id: ${id}, error: ${err}`)
        return err;
    }
});

/**
 * getCommentFromUserId
 * @type {(function(*): Promise<(Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getCommentFromUserId = (async (id) => {
    try {
        let result = await Comment.find({from: id});
        logger.info(`successfully get comment from user: ${id}, result: ${result}`);
        return result
    } catch (err) {
        logger.error(`failed get comment from user: ${id}, error: ${err}`)
        return err;
    }
});

/**
 * getCommentToUserId
 * @type {(function(*): Promise<(Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getCommentToUserId = (async (id) => {
    try {
        let result = await Comment.find({to: id});
        logger.info(`successfully get comment to user: ${id}`);
        return result
    } catch (err) {
        logger.error(`failed get comment to user: ${id}, error: ${err}`)
        return err;
    }
});

const autoIncrementCommentLikes = function (modelName, doc, next) {
    CounterLikes.findByIdAndUpdate(        // ** Method call begins **
        modelName,                           // The ID to find for in counters model
        { $inc: { seq: 1 } },                // The update
        { new: true, upsert: true },         // The options
        function(error, counter) {           // The callback
            if(error) return next(error);
            doc.likes = counter.seq;
            next();
        }
    );
}

const sortingCommentToUserId = (async (sortBy, id) => {
    try {
        let result = await Comment.find({to: id});
        logger.info(`successfully get comment to user: ${id}`);
        return result
    } catch (err) {
        logger.error(`failed get comment to user: ${id}, error: ${err}`)
        return err;
    }
});

module.exports = {
    insertComment,
    getCommentByCommentId,
    getCommentFromUserId,
    getCommentToUserId
}