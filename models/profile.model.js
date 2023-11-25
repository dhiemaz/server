const {model, Schema} = require('mongoose');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const profile = new Schema({
    id: {
        type: Number,
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

autoIncrement.initialize(mongoose.connection);
profile.plugin(autoIncrement.plugin,{
    model: "profile",
    field: "id",
    startAt: 1,
    incrementBy: 1,
}, 'profile');

const Profile = model('profile', profile)

module.exports = {
    Profile
}