const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const recipeRoutes = require('./recipe-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');
const categoryRoutes = require('./category-routes');
const rateRoutes = require('./rate-routes');

const apiRoutes = require('./api/');

router.use('/', homeRoutes);
router.use('/recipe', recipeRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/category', categoryRoutes);
router.use('/rate', rateRoutes);
router.use('/api', apiRoutes);

module.exports = router;