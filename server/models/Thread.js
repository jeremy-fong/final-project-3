const { Schema } = require('mongoose');
const commentSchema = require('./Comment')

const threadSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: 'Please try again!',
            maxlength: 25
        },
        username: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: 'Please try again!',
            minlength: 25
        },
        createdAt: {
            type: Date
        },
        comments: {
            type: Array,
            default: []
        },
        likes: {
            type: Map,
            of: Boolean
        },
        userPicturePath: String,
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