const { Rate } = require('../models');

const ratedata = [
  {
    rating: 4,
    user_id: 2,
    post_id: 1
  },
  {
    rating: 3,
    user_id: 4,
    post_id: 2
  },
  {
    rating: 4,
    user_id: 6,
    post_id: 3
  },
];

const seedRate = () => Rate.bulkCreate(ratedata);

module.exports = seedRate;
