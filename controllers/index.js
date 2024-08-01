const router = require('express').Router();

// Import all your route files here
const userRoutes = require('./api/userRoutes');
const entryRoutes = require('./api/entryRoutes');
const homeRoutes = require('./homeRoutes');

// Use the imported routes\
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/entries', entryRoutes);

module.exports = router;