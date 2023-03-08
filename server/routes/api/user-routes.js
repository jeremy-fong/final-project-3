const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFollower,
    removeFollower
} = require('../../controllers/user-controller');

const {
    getThreads,
    getOneThread,
    createThread,
    updateThread,
    deleteThread,
    addComment,
    removeComment,
} = require('../../controllers/thread-contoller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router
    .route('/')
    .get(getThreads);

router
    .route('/signup')
    .post(createUser);

router.route('/login').post(login);

router
    .route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/profile').get(authMiddleware, getOneUser);

router
    .route('/profile/followers/:followerId')
    .post(addFollower)
    .delete(removeFollower);

module.exports = router;