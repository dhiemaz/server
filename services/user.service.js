const pino = require('pino');
const logger = pino({level: 'info'});
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
        logger.info(`creating new user with id: ${result._id}`);
        return result;
    } catch (err) {
        logger.error(`failed create new user, error: ${err}`);
        throw Error(err);
    }
});

module.exports = {
    insertUser
}