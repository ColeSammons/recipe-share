
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

router.get('/:id', (req, res) => {
    Rate.findAll({
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
            const rate = dbPostData.map(post => post.get({ plain: true }));
            console.log(rate);

            res.render('rate', { rate, loggedIn: req.session.loggedIn, username: req.session.username });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
