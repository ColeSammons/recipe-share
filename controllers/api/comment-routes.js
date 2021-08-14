const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;