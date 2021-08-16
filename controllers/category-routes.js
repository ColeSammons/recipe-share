const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

//get comments from individual user
router.get('/:category', (req, res) => {
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
            // console.log(post[0].category);
            const sortedPost = post.filter((data) => {
                if(data.category == req.params.category) {
                    return true;
                }
                else false;
            });
            // console.log({ sortedPost, loggedIn: req.session.loggedIn, userId: req.session.user_id });

            res.render('category', { sortedPost, loggedIn: req.session.loggedIn, userId: req.session.user_id, category: req.params.category });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});


module.exports = router;
