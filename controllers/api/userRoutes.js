const router = require('express').Router();
const { User } = require('../../models');

// POST route for user signup
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create({ email, password });

    // Return a success message or user data
    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Failed to sign up' });
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists and password matches
    if (user && user.checkPassword(password)) {
      req.session.logged_in = true;
      req.session.user_id = user.id;
      req.session.username = user.email; 
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to log in' });
  }
});

// POST route for user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.json({ message: 'Logged out successfully' });
    });
  } else {
    res.status(400).json({ message: 'No user logged in' });
  }
});

module.exports = router;