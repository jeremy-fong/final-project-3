const { User, Thread } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            return userData;
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrent Email. Please Try Again.');
            }

            const correctPass = await user.isCorrectPassword(password);
            if (!correctPass) {
                throw new AuthenticationError('Incorrect Password. Please Try Again.')
            }

            const token = signToken(user);
            return { token, user };
        },
        /*createThread: async (parent) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { threads: Thread.threadId }},
                    { new: true }
                )
                const updatedThreads = await Thread.findAll();
                return updatedUser;
            }
        },*/
        getThreads: async (parent, args) => {
            const allThreads = await Thread.findAll();
            return allThreads;
        }
    },
}

module.exports = resolvers