const router = require('express').Router();
const { Entry } = require('../../models');

// POST route for new entry
router.post('/', async (req, res) => {
  try {
    const newEntry = await Entry.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // Respond with newly created entry
    res.status(200).json(newEntry);
  } catch (err) {
    res.status(400).json(err); // Error handling
  }
});

// GET route for edit entry by ID
router.get('/edit/:id', async (req, res) => {
  try {
    const entry = await Entry.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'No entry found with this id!' });
    }

    // Process the location data
    const [longitude, latitude] = entry.location.split(',').map(coord => coord.trim());

    // Render the edit page with the entry data
    res.render('editEntry', {
      entry: {
        ...entry.toJSON(),
        latitude,
        longitude
      },
      logged_in: req.session.logged_in,
      mapboxToken: process.env.MAPBOX_TOKEN
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT route to update an entry by its ID
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body); // Log request body for debugging
    const { title, description, location } = req.body;
    const [latitude, longitude] = location.split(',').map(coord => coord.trim());

    // Update the entry with new data
    const [affectedRows] = await Entry.update({
      title,
      description,
      location: `${latitude}, ${longitude}`,
    }, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No entry found with this id!' });
    }

    res.status(200).json({ message: 'Entry updated successfully!' });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json(err);
  }
});

// DELETE route for an entry by id
router.delete('/:id', async (req, res) => {
  try {
    // Delete the entry
    const entryData = await Entry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;