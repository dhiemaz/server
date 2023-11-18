const {model, Schema} = require('mongoose');

const profile = new Schema({
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
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Profile = model('profile', profile)

module.exports = {
    Profile
}