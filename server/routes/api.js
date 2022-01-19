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

router.put('/:id', 
  mediaController.updateMedia, 
  (req, res) => res.status(200).json(res.locals.updatedMedia)
);

router.delete('/:id', mediaController.deleteMedia, (req, res) => {
  res.status(200).send('succesfully deleted from database');
});

module.exports = router;