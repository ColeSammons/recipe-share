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
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            console.log(post);

            res.render('recipe', post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});

module.exports = router;