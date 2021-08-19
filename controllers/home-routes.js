const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../models');

//get all posts from all users
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        include: [
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
            let post = dbPostData.map(post => post.get({ plain: true }));
            let count = 0;
            let users = 0;

            post.forEach(temp => {
               if(temp.rates.length != 0) {
                temp.rates.forEach(data => {
                    count += data.rating;
                    users++;
                    if (req.session.user_id == data.user_id) {
                        data.owned = true;
                    }
                });
                if (count != 0) {
                    temp.users = users;
                    temp.average = (Math.floor(count / temp.rates.length));
                    users = 0;
                    count = 0;

                }
               }
            })
            console.log({ post, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username });

            post.forEach(data => {
                const buffer = Buffer.from(data.pic_buffer);
                const conversion = buffer.toString('base64');
                data.conversion = conversion;
            });
            res.render('homepage', { post, loggedIn: req.session.loggedIn, userId: req.session.user_id, username: req.session.username });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});




module.exports = router;