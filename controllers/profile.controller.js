'use strict';

const pino = require("pino");
const logger = pino({level:'info'})

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

// getProfiles from in-memory
const getProfiles = ((req, res) => {
    logger.info('called getProfiles, result : ' + JSON.stringify(profiles[0]));
    res.status(200).json(profiles);
})

// createProfile
const createProfile = ((req, res) => {
    logger.info('call createProfile, payload : ', req.body);
    res.status(201).json('profile created')
})

// viewDashboardProfile
const viewDashboardProfile = ((req, res) => {
    logger.info('called viewDashboardProfile, result : ' + JSON.stringify(profiles[0]));
    res.render('profile_template', {
        profile: profiles[0],
    });
})

module.exports = {
    getProfiles,
    createProfile,
    viewDashboardProfile
}