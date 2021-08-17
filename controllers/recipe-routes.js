const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

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
        model: Rate
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      let post = dbPostData.get({ plain: true });
      console.log(post);
      const buffer = Buffer.from(post.pic_buffer);
      const conversion = buffer.toString('base64');
      post.conversion = conversion;
      let userPost = false;

      if(req.session.user_id == post.user_id) {
        userPost = true;
      }
      console.log(userPost);

      post.rates.forEach(data => {
        if(req.session.user_id == data.user_id) {
          data.owned = true;
        }
      });
      console.log(post.rates);
      res.render('recipe', { post, loggedIn: req.session.loggedIn, userPost: userPost });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });


});

module.exports = router;