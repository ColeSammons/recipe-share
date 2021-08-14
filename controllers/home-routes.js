const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        include: [
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
        .then(dbPostData => {
            const post = dbPostData.map(post => post.get({ plain: true }));
            console.log(post);
            const data = {
                posts: post
            };

            res.render('homepage', data) ;
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});

module.exports = router;