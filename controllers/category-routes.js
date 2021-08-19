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
            let post = dbPostData.map(post => post.get({ plain: true }));
            let count = 0;
            
            post.forEach(temp => {
               if(temp.rates.length != 0) {
                temp.rates.forEach(data => {
                    count += data.rating;
                    if (req.session.user_id == data.user_id) {
                        data.owned = true;
                    }
                });
                if (count != 0) {
                    temp.average = (Math.floor(count / temp.rates.length));
                    count = 0;

                }
               }
            });
            
            post.forEach(data => {
                const buffer = Buffer.from(data.pic_buffer);
                const conversion = buffer.toString('base64');
                data.conversion = conversion;
            });
            const sortedPost = post.filter((data) => {
                if(data.category == req.params.category) {
                    return true;
                }
                else false;
            });
            // console.log({ sortedPost, loggedIn: req.session.loggedIn, userId: req.session.user_id });

            res.render('category', { sortedPost, loggedIn: req.session.loggedIn, userId: req.session.user_id, category: req.params.category, username: req.session.username });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});


module.exports = router;
