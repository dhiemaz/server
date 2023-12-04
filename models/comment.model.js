const {model, Schema} = require('mongoose');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const comment = new Schema({
    from: {
        type: mongoose.Types.ObjectId, ref: "user",
        required: true,
    },
    to: {
        type: mongoose.Types.ObjectId, ref: "user",
        required: true,
    },
    mbti: {
        type: String,
        required: false,
        default: null
    },
    enneagram: {
        type: String,
        required: false,
        default: null
    },
    zodiac: {
        type: String,
        required: false,
        default: null

    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        startAt: 0
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

autoIncrement.initialize(mongoose.connection);
comment.plugin(autoIncrement.plugin,{
    model: "comment",
    field: "id",
    startAt: 1,
    incrementBy: 1,
}, 'comment');

const Comment = model('comment', comment)

module.exports = {
    Comment
}