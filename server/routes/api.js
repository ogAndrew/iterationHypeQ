const express = require('express');
const mediaController = require('../controllers/mediaController');

const router = express.Router();

router.get('/',
  mediaController.getList,
  (req, res) => res.status(200).json(res.locals.media)
);

router.post('/',
  mediaController.addMedia,
  (req, res) => res.status(200).json(res.locals.mediaItem)
);

router.patch('/:media', mediaController.updateMedia, (req, res) => res.status(200).json(res.locals.updatedMedia)
);

// Delete a media from the database
// http://localhost:3000/api/"id"
router.delete('/:id', mediaController.deleteMedia, (req, res) => {
  res.status(200).send('succesfully deleted from database');
});

module.exports = router;