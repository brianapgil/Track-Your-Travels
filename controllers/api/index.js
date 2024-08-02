const router = require('express').Router();
const signupRoutes = require('./signupRoutes');
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const entryRoutes = require('./entryRoutes'); 

// Define routes
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/users', logoutRoutes);
router.use('/entries', entryRoutes); 

module.exports = router;