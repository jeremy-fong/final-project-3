const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment')
const dateFormat = require('../utils/dateFormat');

const threadSchema = new Schema(
    {
        threadTitle: {
            type: String,
            required: 'Please try again!',
            maxlength: 25
        },
        threadText: {
            type: String,
            required: 'Please try again!',
            minlength: 25
        },
        createdAt: {
            type: Date
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
        id: false
    }
)

threadSchema.virtual('commentCount').get(function () {
    return this.comments.length;
})

module.exports = threadSchema;