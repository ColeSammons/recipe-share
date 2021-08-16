const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../../models');

router.get('/', (req, res) => {
  Post.findAll({
    include: [
      {
        model: Ingredient,
        attributes: ['id', 'name', 'measure', 'post_id']
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: Rate,
        attributes: ['id', 'rating', 'user_id', 'post_id']
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Ingredient,
        attributes: ['id', 'name', 'measure', 'post_id']
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: Rate,
        attributes: ['id', 'rating', 'user_id', 'post_id']
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Post.create({
    name: req.body.name,
    serving: req.body.serving,
    time: req.body.time,
    directions: req.body.directions,
    notes: req.body.notes,
    pic_url: req.body.pic_url,
    category: req.body.category,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;