const pino = require('pino');
const logger = pino({level: 'info'});
const mongoose = require('mongoose');
const {Comment} = require('../models/comment.model');
const {User} = require('../models/user.model');
const {isUserExist} = require("./user.service");
const {inspect} = require('util')

/**
 * insertComment from user to another user
 * @type {(function(*): Promise<(Document<any, any, unknown> & {})|*|undefined>)|*}
 */
const insertComment = (async (data) => {
    const newComment = new Comment({
        from: data.from,
        to: data.to,
        mbti: data.mbti,
        enneagram: data.enneagram,
        zodiac: data.zodiac,
        title: data.title,
        comment: data.comment,
        likes: 0
    })

    try {
        // validate user comment, check if user is exist by query to database.
        const toUser = await isUserExist(data.to);
        if (!toUser) {
            return Promise.reject(`user ${data.to} is not found.`);
        }

        const fromUser = await isUserExist(data.from);
        if (!fromUser) {
            return Promise.reject(`user ${data.from} is not found.`);
        }

        const result = await newComment.save();
        logger.info(`result: ${result}`);
        if (result) {
            User.findOneAndUpdate(
                { name: data.to },
                { $push: { comment: mongoose.Types.ObjectId(result._id) } },
                { new: true, upsert: true }).then(data => {
                logger.info(`tt: ${inspect(data)}`);
            });
        }

        logger.info(`insert new comment from: ${data.from} to: ${data.to}, id: ${result._id}`);
        return result;
    } catch (err) {
        logger.error(`insert new comment from: ${data.from} to: ${data.to}, error: ${err}`);
        return Promise.reject(err);
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
 * getCommentFromUser
 * @type {(function(*): Promise<(Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getCommentFromUser = (async (name) => {
    try {
        const result = await Comment.find().populate('user');
        logger.info(`successfully get comment from user: ${name}, result: ${result}`);
        return result
    } catch (err) {
        logger.error(`failed get comment from user: ${name}, error: ${err}`)
        throw Error(err);
    }
});

/**
 * getCommentToUser
 * @type {(function(*): Promise<(Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown> & {}, {}, unknown> & {})|*|undefined>)|*}
 */
const getCommentToUser = (async (name, sortby, filter, page, limit) => {
    let sort = null;

    let _pageNumber = parseInt(page);
    let _pageSize = parseInt(limit);

    // construct sort field
    if (sortby === 'recent') {
        sort = {'created_at':'desc'};
    } else {
        sort = {'likes':-1};
    }

    const mbti = filter.mbti === true ? {'mbti': { $exists: true, $ne: null }} : {};
    const enneagram = filter.enneagram === true ? {'enneagram': { $exists: true, $ne: null }} : {};
    const zodiac = filter.zodiac === true ? {'zodiac': { $exists: true, $ne: null }} : {};

    try {
        const count = await Comment.countDocuments({
            $and:[{to: id}, mbti, enneagram, zodiac]
        });
        const docs = await Comment.find({$and:[{to: name}, mbti, enneagram, zodiac]}, {to: 0}).
        sort(sort).
        skip(_pageNumber > 0 ? ((_pageNumber - 1) * _pageSize) : 0).
        limit(_pageSize).exec()

        const result = {
            total_count: count,
            comments: docs
        }

        logger.info(`count: ${count}`)
        logger.info(`docs: ${docs}`)
        logger.info(`successfully get comment to user: ${id} sortby: ${sortby}`);
        return result;
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
    getCommentFromUser,
    getCommentToUser,
    likesComment
}