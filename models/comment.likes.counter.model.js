const {model, Schema} = require('mongoose');

const counterLikesSchema = new Schema(
    {
        _id: {type: String, required: true},
        seq: { type: Number, default: 0 }
    }
);

counterLikesSchema.index({ _id: 1, seq: 1 }, { unique: true })

const CounterLikes = mongoose.model('counter', counterLikesSchema);

module.exports = {
    CounterLikes
}

