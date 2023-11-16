const pino = require("pino");
const logger = pino({level: 'info'})
const {
    responseData,
    responseMessage,
    responseView
} = require('../utils/response')

const profiles = [
    {
        "id": 1,
        "name": "A Martinez",
        "description": "Adolph Larrue Martinez III.",
        "mbti": "ISFJ",
        "enneagram": "9w3",
        "variant": "sp/so",
        "tritype": 725,
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png",
    }
];
const insertProfile = ((response, data) => {
    logger.info('creating new profile with data = ', JSON.stringify(data))
    responseMessage(response, 201, 'Profile successfully created');
});

const getProfiles = ((response) => {
    responseData(response, 200, profiles[0])
});

const viewProfile = ((response) => {
    responseView(response, profiles[0])
});

module.exports = {
    insertProfile,
    getProfiles,
    viewProfile
}