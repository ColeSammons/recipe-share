const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../../models');

router.get('/', (req, res) => {
  User.findAll({
    include: [
      {
        model: Post,
        attributes: ['id', 'name', 'serving', 'time', 'directions', 'notes', 'pic_url', 'category', 'user_id'],
        include: [
          {
            model: Ingredient,
            attributes: ['id', 'name', 'measure', 'post_id']
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'post_id', 'user_id'],
          },
        ]
      },
      {
        model: Comment,
        attributes: ['id', 'text', 'user_id', 'post_id'],
        include: {
          model: Post,
          attributes: ['name']
        }
      },
      {
        model: Post,
        attributes: ['name'],
        through: Rate,
        as: 'rated_posts'
      }
    ]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;