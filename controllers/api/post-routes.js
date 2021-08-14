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
        attributes: ['id', 'text', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: Rate,
        attributes: ['id', 'rating', 'user_id', 'post_id']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;