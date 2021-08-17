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
            let post = dbPostData.map(post => post.get({ plain: true }));
            console.log(post);
            post.forEach(data => {
                const buffer = Buffer.from(data.pic_buffer);
                const conversion = buffer.toString('base64');
                data.conversion = conversion;
            });
            res.render('posts', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;