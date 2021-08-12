const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const recipeRoutes = require('./recipe-routes.js');

router.use('/', homeRoutes);
router.use('/recipe', recipeRoutes)

module.exports = router;