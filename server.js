// Linking requirements
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); 
const helpers = require('./helpers/helpers');
const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express(); // Creates an instance of the Express application
const PORT = process.env.PORT || 3001; // Sets the port to dotenv variable or default of 3001

// Sets up handlebars with helpers and layout directory
const hbs = exphbs.create({
  helpers,
  layoutsDir: path.join(__dirname, 'views/layout'),
});

// Session config
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Initialize session middleware
app.use(session(sess));

// Set up handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for static files in public
app.use(express.static(path.join(__dirname, 'public')));

// Use routes in controllers/index.js
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Synchronizes sequelize and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});