const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const ingredientRoutes = require('./ingredient-routes');
const rateRoutes = require('./rate-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/rate', rateRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
