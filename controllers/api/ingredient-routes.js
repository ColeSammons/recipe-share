const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../../models');

router.get('/', (req, res) => {
    Ingredient.findAll({
     
    })
      .then(dbIngData => res.json(dbIngData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;