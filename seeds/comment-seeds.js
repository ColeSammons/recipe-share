const { Comment } = require('../models');

const commentData = [
  {
    text: 'This recipe is Great!',
    user_id: 1,
    post_id: 1
  },
  {
    text: 'This recipe is Bad!',
    user_id: 3,
    post_id: 2
  },
  {
    text: 'This recipe is Horrible!',
    user_id: 5,
    post_id: 2
  },
  {
    text: 'This recipe is Bonkers!',
    user_id: 1,
    post_id: 3
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
