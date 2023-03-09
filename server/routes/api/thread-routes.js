const express = require('express');
const { getFeed, getUserThreads, likeThread } = require('../../controller/thread-controller');
const { signToken } = require('../../utils/auth');

const router = express.Router();

router.get('/', signToken, getFeed);

router.get('/:userId/threads', signToken, getUserThreads);

router.patch('/:id/like', signToken, likeThread);

module.exports = router;