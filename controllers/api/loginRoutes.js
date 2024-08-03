const router = require('express').Router();
const { User_db } = require('../../models'); 

router.post('/', async (req, res) => {
    try {
      const userData = await User_db.findOne({ where: { email: req.body.email } });
  
      if (!userData || !userData.checkPassword(req.body.password)) {
        return res.status(400).json({ message: 'Incorrect email or password' });
      }
  
      req.session.save(() => {
        req.session.logged_in = true;
        req.session.user_id = userData.id;
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

module.exports = router;