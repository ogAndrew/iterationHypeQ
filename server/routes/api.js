const express = require('express');

const mediaController = require('../controllers/mediaController');

const router = express.Router();

router.get('/',
  mediaController.getList,
  (req, res) => res.status(200).json(res.locals.media)
);

// router.get('/species',
//   mediaController.getSpecies,
//   (req, res) => res.status(200).json(res.locals.species)
// );

// router.get('/homeworld',
//   mediaController.getHomeworld,
//   (req, res) => res.status(200).json(res.locals.homeworld)
// );

// router.get('/film',
//   mediaController.getFilm,
//   (req, res) => res.status(200).json(res.locals.film)
// );

router.post('/',
  mediaController.addMedia,
  (req, res) => res.status(200).json(res.locals.mediaItem)
);

// router.patch('/', mediaController.updateMedia, (req, res) => {
//   // if (!res.locals.updatedmedia) {
//   res.status(200).json(res.locals.updatedMedia);
//   // } else {
//   //   res.status(400);
//   // }
// });

// Delete a media from the database
// http://localhost:3000/api/"media_id"
router.delete('/:media', mediaController.deleteMedia, (req, res) => {
  res.status(200).send();
});

module.exports = router;