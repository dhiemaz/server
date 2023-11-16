const pino = require("pino");
const logger = pino({level: 'info'})
const {
    responseData,
    responseMessage,
    responseView
} = require('../utils/response')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const userProfile = new Schema({
    id: {
        type: Number,
        default: 0,
        startAt: 1
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mbti: {
        type: String,
        required: true
    },
    enneagram: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: true
    },
    tritype: {
        type: Number,
        required: true
    },
    socionics: {
        type: String,
        required: true
    },
    sloan: {
        type: String,
        required: true
    },
    psyche: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const insertProfile = ((response, data) => {
    let newProfile = new userProfile({
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
    const profile = await userProfile.findOne({_id: id})
    if (profile) {
        responseData(response, 200, profile);
    } else {
        responseData(response, 200, profile);
    }
});

const viewProfile = ((response) => {
    responseView(response, profiles[0])
});

module.exports = {
    insertProfile,
    getProfiles,
    viewProfile
}