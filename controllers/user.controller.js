'use strict';

const pino = require("pino");
const logger = pino({level: 'info'})
const {
    createUser
} = require('../services/profile.service')
const {responseMessage, responseData, responseView} = require("../utils/response");
