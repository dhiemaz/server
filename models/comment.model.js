const {model, Schema} = require('mongoose');

const comment = new Schema({
    id: {
        type: Number,
        default: 0,
        startAt: 1
    },
    name: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

const Comment = model('comment', comment)

module.exports = {
    Comment
}