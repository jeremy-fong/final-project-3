const { User } = require('../models');
const { post } = require('../models/Thread');
const Thread = require('../models/Thread');

module.exports = {
    createThread: async function (req, res) {
        try {
            const { userId, title, description } = req.body;
            const user = await User.findById(userId);

            const newThread = new Thread({
                userId,
                username: user.username,
                title,
                description,
                userPicturePath: user.picturePath,
                likes: {},
                comments: []
            })
            await newThread.save();

            const thread = await Thread.find();
            res.status(201).json(thread);
        } catch (err) {
            res.status(409).json({ message: err.message })
        }
    },
    getFeed: async function (req, res) {
        try {
            const thread = await Thread.find();
            res.status(200).json(thread);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    },
    getUserThreads: async function (req, res) {
        try {
            const { userId } = req.params;
            const thread = await Thread.find({ userId });
            res.status(200).json(thread);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }  
    },
    likeThread: async function (req, res) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const thread = await Thread.find({ id });
            const isLiked = thread.like.get(userId);

            if (isLiked) {
                thread.likes.delete(userId);
            } else {
                post.likes.set(userId, true);
            }

            const updatedThread = await Thread.findById(
                id,
                { likes: post.likes },
                { new: true } 
            )

            res.status(200).json(updatedThread);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    },
    commentOnThread: async function (req, res) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const thread = await Thread.find({ id });
            const isLiked = thread.like.get(userId);

            if (isLiked) {
                thread.likes.delete(userId);
            } else {
                post.likes.set(userId, true);
            }

            const updatedThread = await Thread.findById(
                id,
                { likes: post.likes },
                { new: true } 
            )

            res.status(200).json(updatedThread);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
}