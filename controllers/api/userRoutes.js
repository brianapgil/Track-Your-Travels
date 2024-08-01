const router = require('express').Router();
const { User_db } = require('../../models'); // Adjust if necessary

// Serve signup page
router.get('/', (req, res) => {
    res.render('signup');
});

// Handle signup form submission
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Create a new user
        const newUser = await User_db.create({ 
            email, 
            password 
        });

        // Save user data in session and redirect
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.redirect('/login'); 
        });
    } catch (err) {
        console.error('Error during sign-up:', err);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;