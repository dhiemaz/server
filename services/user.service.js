const pino = require('pino');
const logger = pino({level: 'info'});
const {User} = require('../models/user.model')
const e = require("express");

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
        logger.info(`creating new user with id: ${result._id}`);
        return result;
    } catch (err) {
        logger.error(`failed create new user, error: ${err}`);
        throw Error(err);
    }
});

const getUser = (async (name) => {
    try {
        let user = await User.findOne({name: name});
        if (!user) {
            throw Error(`user ${name} is not found.`);
        }

        logger.info(`get user: ${name}, result: ${user}`);
        return user;
    }catch (err) {
        logger.error(`failed get user: ${name}, error: ${err}`);
        throw Error(err);
    }
})

const isUserExist = (async (name) => {
    try {
        let user = await User.findOne({name: name});
        if (!user) {
            return false;
        }

        logger.info(`get user: ${name}, result: user is exist.`);
        return true;
    }catch (err) {
        logger.error(`failed get user: ${name}, error: ${err}`);
        return false;
    }
})

module.exports = {
    insertUser,
    getUser,
    isUserExist
}