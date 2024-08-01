const router = require('express').Router();
const { User_db } = require('../../models'); 

// Route to handle user sign-ups
router.post('/', async (req, res) => {
  try {
    const userData = await User_db.create({
      email: req.body.email,
      password: req.body.password, 
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;