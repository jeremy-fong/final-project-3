const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Email address must be matching!'],
        },
        threads: [
            {
                tpye: Schema.Types.ObjectId,
                ref: 'Thread',
            },
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('followerCount').get(function () {
    return this.followers.length;
});

const User = model('User', userSchema);

module.exports = User;