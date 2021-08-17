const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../../models');

router.get('/', (req, res) => {
  Rate.findAll({

  })
    .then(dbRateData => res.json(dbRateData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Rate.create({
    rating: req.body.rating,
    update: req.body.update,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbRateData => res.json(dbRateData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/', (req, res) => {
  Rate.update(
    {
      rating: req.body.rating,
      update: req.body.update
    },
    {
      where: {
        user_id: req.session.user_id,
        post_id: req.body.post_id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;