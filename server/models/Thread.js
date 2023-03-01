const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const threadSchema = new Schema(
    {
        threadText: {
            type: String,
            required: 'Please try again!',
            minlength: 25
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => dateFormat(timeStamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        if: false
    }
)

module.exports = threadSchema;