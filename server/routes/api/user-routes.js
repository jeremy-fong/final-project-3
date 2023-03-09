const express = require('express');
const {
    getUser,
    getUserFollowers,
    addRemoveFollower
} = require('../../controller/user-controller');

const { signToken } = require('../../utils/auth');

const router = express.Router();

router.get('/:id', signToken, getUser);

router.get('/:id/followers', signToken, getUserFollowers);

router.patch('/:id/:followerId', signToken, addRemoveFollower);

module.exports = router;