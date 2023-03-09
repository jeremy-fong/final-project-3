const { User, Thread } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            return userData;
        },
        getThreads: async (parent) => {
            const threads = await Thread.find();
            return threads;
        },
        getThread: async (parent, { threadId }) => {
            const thread = await Thread.findById(threadId);
            if(thread){
                return thread;
            } else {
                throw new Error('Thread not Found!');
            }
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
        createThread: async (parent, { title, text }, context) => {
            if (context.user) {
                const thread = await Thread.create({
                    title,
                    text,
                    thoughtAuthor: context.user.username,
                  });
          
                  await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { threads: thread._id } }
                  );
          
                  return thread;
            }
        },
        addComment: async (parent, { threadId, text }, context) => {
            if (context.user) {
                return Thread.findOneAndUpdate(
                    { id: threadId },
                    {
                        $addToSet: {
                            comments: { text, commentAuthor: context.user.username },
                        }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
            }
        },
        removeThread: async (parent, { threadId }, context) => {
            if (context.user) {
              const thread = await Thread.findOneAndDelete({
                _id: threadId,
                thoughtAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { threads: thread._id } }
              );
      
              return thread;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (parent, { threadId, commentId }, context) => {
            if (context.user) {
                return Thread.findOneAndUpdate(
                    { _id: threadId },
                    {
                    $pull: {
                        comments: {
                        _id: commentId,
                        commentAuthor: context.user.username,
                        },
                    },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
}

module.exports = resolvers