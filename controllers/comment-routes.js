const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

//get comments from individual user
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Post
            },
            {
                model: User
            }
        ]
    })
        .then(dbPostData => {
            const post = dbPostData.map(post => post.get({ plain: true }));
            console.log(post);

            res.render('comment', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});


module.exports = router;
