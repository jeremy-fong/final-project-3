const { Schema, model } = require('mongoose');
const threadSchema = require('./Thread')
const dateFormat = require('../utils/dateFormat');

const categorySchema = new Schema(
    {
        categoryTitle: {
            type: String,
            required: 'Please Try Again!',
            id: true,
            maxlength: 20
        },
        threads: [threadSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)