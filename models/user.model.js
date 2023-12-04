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

// autoIncrement.initialize(mongoose.connection);
// user.plugin(autoIncrement.plugin,{
//     model: "user",
//     field: "id",
//     startAt: 1,
//     incrementBy: 1,
// }, 'user');

const User = model('user', user)

module.exports = {
    User
}