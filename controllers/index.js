const router = require('express').Router();

// Import all your route files here
const userRoutes = require('./api/userRoutes');
const entryRoutes = require('./api/entryRoutes');
const homeRoutes = require('./homeRoutes');
const signupRoutes = require('./api/signupRoutes');

// Use the imported routes\
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/entries', entryRoutes);
router.use('/signup', signupRoutes);

module.exports = router;