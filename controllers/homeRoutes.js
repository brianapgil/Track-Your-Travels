const router = require('express').Router();
const { User_db, Entry } = require('../models');
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

// Route to render the new entry page (with Mapbox token)
router.get('/newEntry', withAuth, (req, res) => {
  res.render('newEntry', {
    logged_in: req.session.logged_in,
    mapboxToken: process.env.MAPBOX_TOKEN, // Pass the Mapbox API token to the template
  });
});

// Route to render the collection page
router.get('/collection', withAuth, async (req, res) => {
  try {
    const entryData = await Entry.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const entries = entryData.map((entry) => entry.get({ plain: true }));

    res.render('collection', {
      entries,
      logged_in: req.session.logged_in,
      mapboxToken: process.env.MAPBOX_TOKEN, // Pass the Mapbox API token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/editEntry/:id', withAuth, async (req, res) => {
  try {
    const entryData = await Entry.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      return res.status(404).render('404'); // Render a 404 page or redirect
    }

    const entry = entryData.get({ plain: true });

    res.render('editEntry', {
      entry,
      logged_in: req.session.logged_in,
      mapboxToken: process.env.MAPBOX_TOKEN, // Pass Mapbox token if needed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;