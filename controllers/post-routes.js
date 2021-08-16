const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

//get posts from individual user
router.get('/:id', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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

            res.render('posts', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});

module.exports = router;
