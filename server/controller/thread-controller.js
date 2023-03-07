const { Thread, User } = require('../models');

// function to find all threads
const getThreads = (req, res) => {
    Thread.find()
        .sort({ createdAt: -1 })
        .then((threads) => {
            res.json(threads);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// function to find one thread
const getOneThread = (req, res) => {
    const threadID = req.params.threadId;
    Thread.find({ _id: threadID })
        .then((thread) => {
            if (!thread) {
                res.status(500).json({ message: 'Cannot find thread with this ID!' });
            }

            res.json(thread);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const createThread = (req, res) => {
    let body = req.body;
    Thread.create(body)
        .then((thread) => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { threads: thread._id }},
                { new: true }
            );
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'There is no user with this ID!'});
            }

            res.json({ message: 'thread was created!'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// function to update a thread
const updateThread = (req, res) => {
    let body = req.body;
    let threadID = req.params.threadId;
    Thread.findOneAndUpdate(
        { _id: threadID }, 
        { $set: body }, 
        { runValidators: true, new: true}
        )
        .then((thread) => {
            if (!thread) {
                res.status(404).json({ message: 'There is no thread with this ID!'});
            }

            res.json(thread);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// function to delete a thread
const deleteThread = (req, res) => {
    let threadID = req.params.threadId;
    Thread.findOneAndRemove({ _id: threadID })
        .then((thread) => {
            if (!thread) {
            return res.status(404).json({ message: 'No thread with this id!' });
            }

            User.findOneAndUpdate(
            { threads: threadID },
            { $pull: { threads: threadID } },
            { new: true }
            );
        })
        .then((user) => {
            if (!user) {
            res.status(404).json({ message: 'thread created but no user with this id!' });
            }
            res.json({ message: 'thread successfully deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// function to add a reaction to a thread
const addComment = (req, res) => {
    let threadID = req.params.threadId;
    Thread.findOneAndUpdate(
        { _id: threadID },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((thread) => {
            if (!thread) {
                res.status(404).json({ message: 'Cannot find thread with this ID!' });
            }
            res.json(thread);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const removeComment = (req, res) => {
    let threadID = req.params.threadId;
    let commentID = req.params.commentId;
    Thread.findOneAndUpdate(
        { _id: threadID },
        { $pull: { reactions: { commentID: commentID } } },
        { runValidators: true, new: true }
        )
        .then((thread) => {
            if (!thread) {
                res.status(404).json({ message: 'Cannot find thread with this ID!' });
            }
            res.json(thread);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

module.exports = {
    getThreads,
    getOneThread,
    createThread,
    updateThread,
    deleteThread,
    addComment,
    removeComment,
};