const router = require('express').Router();
const { User } = require('../../models'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const withAuth = require('../../helpers/auth'); // Adjust the path as needed

// POST route for user signup
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword });

    // Redirect to login page
    res.redirect('/login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists and password matches
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.logged_in = true;
      req.session.user_id = user.id;
      req.session.username = user.username;
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
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