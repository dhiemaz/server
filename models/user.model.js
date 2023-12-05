const {model, Schema} = require('mongoose');
const mongoose = require('mongoose')

const user = new Schema({
    name: {
        type: String,
        required: true
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = model('user', user)

module.exports = {
    User
}