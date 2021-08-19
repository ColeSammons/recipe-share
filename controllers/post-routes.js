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
            let count = 0;

            post.forEach(temp => {
                if (temp.rates.length != 0) {
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
            res.render('posts', { post, loggedIn: req.session.loggedIn, username: req.session.username });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;
