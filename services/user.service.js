const pino = require('pino');
const logger = pino({level: 'info'});
const mongoose = require('mongoose')
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
        if (!user) {
            logger.error(`get user: ${id}, result: user not found.`);
            return Promise.reject(`user ${id} not found.`);
        }

        logger.info(`get user: ${id}, result: ${user}`);
        return user;
    }catch (err) {
        logger.error(`failed get user: ${id}, error: ${err}`);
        return Promise.reject(err);
    }
});

const isUserExist = (async (id) => {
    try {
        let user = await User.findOne({_id: mongoose.Types.ObjectId(id)});
        if (!user) {
            logger.error(`get user: ${id}, result: user not found.`);
            return false;
        }

        logger.info(`get user: ${id}, result: user exist.`);
        return true;
    }catch (err) {
        logger.error(`failed get user: ${id}, error: ${err}`);
        return false;
    }
});

module.exports = {
    insertUser,
    getUser,
    isUserExist
}