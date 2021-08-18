const router = require('express').Router();
const sequelize = require('../../config/connection');
const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
const { User, Post, Ingredient, Rate, Comment } = require('../../models');

router.get('/', (req, res) => {
  Post.findAll({
    include: [
      {
        model: Ingredient,
        attributes: ['id', 'name', 'measure', 'post_id']
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username']
        }
      },
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
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Ingredient,
        attributes: ['id', 'name', 'measure', 'post_id']
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username']
        }
      },
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
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', upload.single('file-pic'), function (req, res) {
  Post.create({
    name: req.body.name,
    serving: req.body.serving,
    time: req.body.time,
    directions: req.body.directions,
    notes: req.body.notes,
    mimetype: req.file.mimetype,
    pic_buffer: req.file.buffer,
    category: req.body.category,
    user_id: req.session.user_id
  })
    .then(dbPostData => {

      let ingArray = [];
      for (let i = 0; i < req.body.ingName.length; i++) {
        ingArray[i] = { name: req.body.ingName[i], measure: req.body.ingMeasure[0], post_id: dbPostData.dataValues.id };

      }
      console.log(ingArray);
      Ingredient.bulkCreate(ingArray)
        .then(dbIngData => {
          res.json(dbIngData);

        });

      console.log(dbPostData);
      // res.json(dbPostData);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  console.log(req.file.buffer, req.file, req.body);
});

router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;