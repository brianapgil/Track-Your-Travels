const router = require('express').Router();
const { User } = require('../../models'); // Adjust path as necessary

// Serve signup page
router.get('/', (req, res) => {
    res.render('signup');
});

// Handle signup form submission
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
          }

        // Create a new user
        const newUser = await User.create({ 
            username, 
            password, 
        });

        // Redirect to login page or homepage
        res.status(201).json(newUser);

        res.redirect('/login');
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user' });
    }
    });

module.exports = router;