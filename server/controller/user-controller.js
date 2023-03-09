const User = require('../models');

module.exports = {
    getUser: async function (req, res) {
        try {
            const { _id } = req.params;
            const user = await User.findById(_id);
            res.status(200).json(user);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },
    getUserFollowers: async function (req, res) {
        try {
            const { _id } = req.params;
            const followers = await Promise.all(
                User.followers.map((id) => {
                    User.findByID(_id);
                })
            );
            const formattedFollowers = followers.map(
                ({ _id, username, picturePath }) => {
                    return ({ _id, username, picturePath })
                }
            );
            res.status(200).json(formattedFollowers);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },
    addRemoveFollower: async function (req, res) {
        try{
            const { _id, followerId } = req.params;
            const user = await User.findById(_id);
            const follower = await User.findById(followerId);

            if (user.follower.includes(followerId)) {
                user.followers = user.followers.filter((id) => id !== followerId);
            } else {
                user.followers.push(followerId);
            }

            await user.save();
            await follower.save();

            const followers = await Promise.all(
                User.followers.map((id) => {
                    User.findByID(_id);
                })
            );
            const formattedFollowers = followers.map(
                ({ _id, username, picturePath }) => {
                    return ({ _id, username, picturePath })
                }
            );

            res.status(200).json(formattedFollowers);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}