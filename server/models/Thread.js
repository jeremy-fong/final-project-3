const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment')
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
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true
        },
        if: false
    }
)

threadSchema.virtual('commentCount').get(function () {
    return this.comments.length;
})

module.exports = threadSchema;