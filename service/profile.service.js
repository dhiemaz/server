const pino = require('pino');
const logger = pino({level: 'info'});
const {
    responseData,
    responseMessage,
    responseView
} = require('../utils/response')
const dataProfile = require('../models/profile.model')


const insertProfile = ((response, data) => {
    let newProfile = new dataProfile.userProfile({
        name: data.name,
        description: data.description,
        mbti: data.mbti,
        enneagram: data.enneagram,
        variant: data.variant,
        tritype: data.tritype,
        socionics: data.socionics,
        sloan: data.sloan,
        psyche: data.psyche,
        image: 'https://soulverse.boo.world/images/1.png'
    })

    newProfile.save().then(function () {
        logger.info('creating new profile with data: ', JSON.stringify(data));
        responseMessage(response, 201, 'Profile successfully created');
    }).catch(function(err) {
        logger.error('failed create new profile, error: ', err);
        responseMessage(response, 422, 'Failed create profile');
    })
});

const getProfiles = (async (response, id) => {
    const profile = await dataProfile.userProfile.findOne({_id: id})
    if (profile) {
        responseData(response, 200, profile);
    } else {
        responseData(response, 404, profile);
    }
});

const viewProfile = ((response) => {
    responseView(response, dataProfile.profiles[0])
});

module.exports = {
    insertProfile,
    getProfiles,
    viewProfile
}