'use strict';

const pino = require("pino");
const logger = pino({level: 'info'});
const {
    insertUser,
    getUser
} = require('../services/user.service');
const {responseMessage, responseData, responseView} = require("../utils/response");

/**
 * createUser
 * @type {(function(*, *): Promise<void>)|*}
 */
const createUser = (async (req, res) => {
    let data = {...req.body}
    logger.info(`create a new user, data: ${data}`);

    await insertUser(data).then(function (result) {
        responseMessage(res, 201, 'success', result);
    }).catch(function (err) {
        responseMessage(res, 422, err.toString());
    });
})

/**
 * findUser
 * @type {(function(*, *): Promise<void>)|*}
 */
const findUser = (async (req, res) => {
    logger.info(`get user id: ${req.params.id}`);

    await getUser(req.params.id).then(function (result) {
        if (result) {
            responseMessage(res, 200, 'success', result);
        } else {
            responseMessage(res, 404, 'success', result);
        }
    }).catch(function (err) {
        responseMessage(res, 500, `failed find user with id: ${req.params.id}, ${err}.`, null);
    });
})

module.exports = {
    createUser,
    findUser
};