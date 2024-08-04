const router = require('express').Router();

// POST route for logout
router.post('/logout', (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      res.status(204).end(); 
    });
  } else {
    res.status(404).end(); 
  }
});

module.exports = router;