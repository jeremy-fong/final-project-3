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

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/followers/:followerId')
    .post(addFollower)
    .delete(removeFollower);

module.exports = router;