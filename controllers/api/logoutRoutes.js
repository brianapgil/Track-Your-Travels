const router = require('express').Router();

// Route to handle logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end(); // No content, successful logout
    });
  } else {
    res.status(404).end(); // Not logged in, nothing to logout
  }
});

module.exports = router;