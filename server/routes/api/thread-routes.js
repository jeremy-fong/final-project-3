const router = require('express').Router();
const {
    getThreads,
    getOneThread,
    createThread,
    updateThread,
    deleteThread,
    addComment,
    removeComment,
} = require('../../controllers/thread-contoller');

router
    .route('/')
    .get(getThreads)
    .post(createThread);

router
    .route('/:threadId')
    .get(getOneThread)
    .put(updateThread)
    .delete(deleteThread);

router
    .route('/:threadId/comments')
    .post(addComment);

router
    .route('/:threadId/comments/:commentId')
    .delete(removeComment);

module.exports = router;