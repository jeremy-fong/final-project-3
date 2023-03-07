const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const threadRoutes = require('./thread-routes.js');

router.use('/users', userRoutes);
router.use('/threads', threadRoutes);

module.exports = router;