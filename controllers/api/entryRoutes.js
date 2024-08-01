const router = require('express').Router();
// Import the Entry model from the models folder
const { Entry } = require('../../models');

// If a POST request is made to /api/projects, a new entry is created. If there is an error, the function returns with a 400 error. 
router.post('/', async (req, res) => {
    try {
      const newEntry = await Entry.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newEntry);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // If a DELETE request is made to /api/projects/:id, that entry is deleted. 
router.delete('/:id', async (req, res) => {
    try {
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
  