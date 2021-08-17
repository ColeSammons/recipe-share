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

router.post('/', (req, res) => {
  Ingredient.create({
    name: req.body.name,
    measure: req.body.measure,
    post_id: req.body.post_id
  })
    .then(dbIngData => res.json(dbIngData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;