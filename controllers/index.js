const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const recipeRoutes = require('./recipe-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js')
const apiRoutes = require('./api/');

router.use('/', homeRoutes);
router.use('/recipe', recipeRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/api', apiRoutes);

module.exports = router;