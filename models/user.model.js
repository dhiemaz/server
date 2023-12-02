const {model, Schema} = require('mongoose');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const user = new Schema({
    name: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

autoIncrement.initialize(mongoose.connection);
user.plugin(autoIncrement.plugin,{
    model: "user",
    field: "id",
    startAt: 1,
    incrementBy: 1,
}, 'user');

const User = model('user', user)

module.exports = {
    User
}