const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Ingredient, Rate, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    include: [
      {
        model: Post,
        include: [
          {
            model: Ingredient,
            
          },
          {
            model: Comment,
            
          },
        ]
      },
      {
        model: Comment,
        
        include: {
          model: Post,
          attributes: ['name']
        }
      },
      {
        model: Post,
        attributes: ['name'],
        through: Rate,
        as: 'rated_posts'
      }
    ]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//sign up user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
        alert('signed up');
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login user
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//logout user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      alert('logged out');
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;