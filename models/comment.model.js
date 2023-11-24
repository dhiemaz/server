const {model, Schema} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const comment = new Schema({
    from: {
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
    likes: {
        type: Number,
        required: true
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

comment.plugin(autoIncrement.plugin, { model: 'comment', field: 'likes', startAt: 0, incrementBy: 1});

const Comment = model('comment', comment)

module.exports = {
    Comment
}