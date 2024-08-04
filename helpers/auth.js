// Middleware for authentication
module.exports = (req, res, next) => {
  if (!req.session.logged_in) {
    // Redirect to the login page if the user is not logged in
    res.redirect('/login'); 
  } else {
    // Otherwise proceed as usual
    next();
  }
};