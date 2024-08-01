const router = require('express').Router();
const { User_db } = require('../models');
const withAuth = require('../helpers/auth');

// Route to render the home page (protected route)
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User_db.findAll({
      attributes: { exclude: ['password'] },
      order: [['email', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('home', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to home page
  if (req.session.logged_in) {
    return res.redirect('/'); // Redirect to home if logged in
  }
  res.render('login'); // Render login page if not logged in
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to home page
  if (req.session.logged_in) {
    return res.redirect('/'); // Redirect to home if logged in
  }
  res.render('signup'); // Render signup page if not logged in
});

module.exports = router;