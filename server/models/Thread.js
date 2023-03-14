const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const threadSchema = new Schema(
    {
        title: {
            type: String,
            required: 'Please try again!',
            maxlength: 25
        },
        threadAuthor: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: 'Please try again!',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        comments: [
            {
                commentText: {
                    type: String,
                    required: true,
                    minlength: 1,
                    maxlength: 280,
                },
                commentAuthor: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (timestamp) => dateFormat(timestamp),
                },
            },
        ],
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

const Thread =  model('Thread', threadSchema);

module.exports = Thread;