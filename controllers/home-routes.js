const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

//get all posts from all users
router.get('/', (req, res) => {
    console.log(req.session);
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
            let post = dbPostData.map(post => post.get({ plain: true }));
            console.log({ post, loggedIn: req.session.loggedIn, userId: req.session.user_id });


            post.forEach(data => {
                const buffer = Buffer.from(data.pic_buffer);
                const conversion = buffer.toString('base64');
                data.conversion = conversion;
            });
            res.render('homepage', { post, loggedIn: req.session.loggedIn, userId: req.session.user_id });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});




module.exports = router;