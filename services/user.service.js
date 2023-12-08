const pino = require('pino');
const logger = pino({level: 'info'});
const mongoose = require('mongoose')
const {User} = require('../models/user.model')

/**
 * insertUser
 * @type {(function(*): Promise<(Document<any, any, unknown> & {})|undefined>)|*}
 */
const insertUser = (async (data) => {
    let newUser = new User({
        name: data.name,
    })
    try {
        let result = await newUser.save();
        logger.info(`successfully create new user id: ${result._id}`);
        return result;
    } catch (err) {
        logger.error(`failed create new user, error: ${err}`);
        throw Error(err);
    }
});

const getUser = (async (id) => {
    try {
        let user = await User.findOne({_id: mongoose.Types.ObjectId(id)});
        logger.info(`get user: ${id}, result: ${user}`);
        return user;
    }catch (err) {
        logger.error(`failed get user: ${id}, error: ${err}`);
        return Promise.reject(err);
    }
});

const isUserExist = (async (id) => {
    try {
        const result = await User.findOne({ _id: id }).exec();
        if (result) {
            logger.info(`get user: ${id}, result: user exist.`);
            return true;
        } else {
            logger.error(`get user: ${id}, result: user not found.`);
            return false;
        }
    } catch (err) {
        logger.error(`failed get user: ${id}, error: ${err}`);
        return false;
    }
});

module.exports = {
    insertUser,
    getUser,
    isUserExist
}