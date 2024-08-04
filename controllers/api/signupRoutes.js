const router = require('express').Router();
const { User_db } = require('../../models'); 

// POST route to handle user sign-ups
router.post('/', async (req, res) => {
  try {
    // Create a new user with the entered email and password
    const userData = await User_db.create({
      email: req.body.email,
      password: req.body.password, 
    });

    // Save the session and log the user in
    req.session.save(() => {
      req.session.logged_in = true; // Mark user as logged in
      req.session.user_id = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;