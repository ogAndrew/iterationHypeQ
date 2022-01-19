const db = require('../models/mediaModels');

const mediaController = {};

mediaController.getList = (req, res, next) => {
  const query = 'SELECT * FROM media';
  db
    .query(query)
    .then(result => {
      res.locals.media = result.rows;
      return next();
    })
    .catch(e => {
      console.log('error at mediaController.getList', e);
      return next({
        log: 'Express error handler caught in getList middleware error',
        message: { err: 'An error occurred in getList middleware error' }
      });
    });
};

mediaController.addMedia = (req, res, next) => {
  const query = 'INSERT INTO media(title, category, duration, priority, url) VALUES ($1, $2, $3, $4, $5) RETURNING *';

  const data = [
    req.body.title,
    req.body.category,
    req.body.duration,
    req.body.priority,
    req.body.url,
  ];

  db.query(query, data)
    .then((response) => { 
      res.locals.mediaItem = response.rows[0];
      return next();
    })
    .catch(e => {
      console.log('error at mediaController.addMedia', e);
      return next({
        log: 'Express error handler caught in addMedia middleware error',
        message: { err: 'An error occurred in addMedia middleware error' }
      });
    });
};

mediaController.updateMedia = (req, res, next) => {
  const id = req.params.id

  const query = 'UPDATE media SET title = $1, category = $2, duration = $3, priority = $4, url = $5 WHERE id = $6 RETURNING *';
  const data = [
    req.body.title,
    req.body.category,
    req.body.duration,
    req.body.priority,
    req.body.url,
    id,
  ];

  db.query(query, data)
    .then((response) => {
      res.locals.updatedMedia = response.rows[0];
      return next();
    })
    .catch(e => {
      console.log('error at mediaController.updateMedia', e);
      return next({
        log: 'Express error handler caught in updateMedia middleware error',
        message: { err: 'An error occurred in updateMedia middleware error' }
      });
    });
};

mediaController.deleteMedia = (req, res, next)=>{
  const id = req.params.media;
  // replace media_id with primary key
  const query = 'DELETE FROM media WHERE media_id = $1;';

  db
    .query(query, [id])
    .then(() => {
      console.log('media deleted!');
      return next();
    })
    .catch(e => {
      console.log('error at mediaController.deleteMedia', e);
      return next({
        log: 'Express error handler caught in deleteMedia middleware error',
        message: { err: 'An error occurred in deleteMedia middleware error' }
      });
    });

};

module.exports = mediaController;
