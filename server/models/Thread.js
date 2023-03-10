const mongoose = require('mongoose');

const { Schema } = mongoose;

const threadSchema = new Schema(
    {
        userId: {
            type: String,
        },
        title: {
            type: String,
            required: 'Please try again!',
            maxlength: 25
        },
        username: {
            type: String,
        },
        description: {
            type: String,
            required: 'Please try again!',
        },
        createdAt: {
            type: Date
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
                    type: Date
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

const Thread =  mongoose.model('Thread', threadSchema);

module.exports = Thread;