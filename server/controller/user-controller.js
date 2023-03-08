const { User, Thought } = require('../models');

const { signToken } = require('../utils/auth');

// function to get all users
const getUsers = (req, res) => {
    User.find()
        .select('-__v')
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// function to get one user
const getOneUser = (req, res) => {
    let userID = req.params.userId;
    User.findOne({ _id: userID })
        .select('-__v')
        .populate('followers')
        .populate('threads')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'Cannot find user with this ID!' });
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// function to create a user
const createUser = (req, res) => {
    let body = req.body;
    User.create(body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// function to update a user
const updateUser = (req, res) => {
    let userID = req.params.userId;
    let body = req.body;
    User.findOneAndUpdate(
        { _id: userID },
        { $set: body },
        { runValidators: true, new: true }
    )
    .then((user) => {
        if (!user) {
                res.status(404).json({ message: 'Cannot find user with this ID!' });
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const deleteUser = (req, res) => {
    let userID = req.params.userId;
    User.findOneAndDelete({ _id: userID })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'Cannot find user with this ID!' });
            }

            Thought.deleteMany({ _id: { $in: user.threads }});
        })
        .then(() => {
            res.json({ message: 'User and threads deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const addfollower = (req, res) => {
    let userID = req.params.userId;
    let followerID = req.params.followerId;
    User.findOneAndUpdate({ _id: userID }, { $addToSet: { followers: followerID }}, { new: true })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'Cannot find User with this ID!' });
            }

            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
};

const removefollower = (req, res) => {
    let userID = req.params.userId;
    let followerID = req.params.followerId;
    User.findOneAndUpdate({ _id: userID }, { $pull: { followers: followerID }}, { new: true })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'Cannot find User with this ID!' });
            }

            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
}

const login = ({ body }, res) => {
    const user = User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
}

module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addfollower,
    removefollower,
    login
}