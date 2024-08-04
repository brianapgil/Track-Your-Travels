const router = require('express').Router();
const { User_db, Entry } = require('../models');
const withAuth = require('../helpers/auth');

// Route to render the home page using withAuth
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all users and order them by email
    const userData = await User_db.findAll({
      attributes: { exclude: ['password'] },
      order: [['email', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));
    // Render the home page
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
  if (req.session.logged_in) {
    return res.redirect('/'); // Redirect to home if already logged in
  }
  res.render('login'); // Render the login page
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/'); // Redirect to home if already logged in
  }
  res.render('signup'); // Render the signup page
});

// Route to render the new entry page
router.get('/newEntry', withAuth, (req, res) => {
  res.render('newEntry', {
    logged_in: req.session.logged_in,
    mapboxToken: process.env.MAPBOX_TOKEN, // Passing the mapbox token
  });
});

// Route to render the collection page
router.get('/collection', withAuth, async (req, res) => {
  try {
    // Fetch all entries for the logged in user
    const entryData = await Entry.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const entries = entryData.map((entry) => entry.get({ plain: true }));
    // Renders the collection page
    res.render('collection', {
      entries,
      logged_in: req.session.logged_in,
      mapboxToken: process.env.MAPBOX_TOKEN, // Passing the mapbox token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the Edit Entry page
router.get('/editEntry/:id', withAuth, async (req, res) => {
  try {
    // Fetch the specific entry by ID and user ID
    const entryData = await Entry.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      return res.status(404).render('404'); // Render a 404 page or redirect if not found
    }

    const entry = entryData.get({ plain: true });

    // Renders the edit entry page
    res.render('editEntry', {
      entry,
      logged_in: req.session.logged_in,
      mapboxToken: process.env.MAPBOX_TOKEN, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Renders the travel tips page
router.get('/travelTips', withAuth, (req, res) => {
  res.render('travelTips', {
    logged_in: req.session.logged_in
  });
});

module.exports = router;