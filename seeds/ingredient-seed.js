const { Ingredient } = require('../models');

const ingdata = [
  {
    name: 'Filet',
    measure: '7 oz',
    post_id: 1
  },
  {
    name: 'garlic butter',
    measure: '2 oz',
    post_id: 1
  },
  {
    name: 'french fries',
    measure: '1 cup',
    post_id: 1
  },
  {
    name: 'steak seasoning',
    measure: '3 tsps',
    post_id: 1
  },
  {
    name: 'Filet',
    measure: '7 oz',
    post_id: 2
  },
  {
    name: 'garlic butter',
    measure: '2 oz',
    post_id: 2
  },
  {
    name: 'french fries',
    measure: '1 cup',
    post_id: 2
  },
  {
    name: 'steak seasoning',
    measure: '3 tsps',
    post_id: 2
  },
  {
    name: 'Filet',
    measure: '7 oz',
    post_id: 3
  },
  {
    name: 'garlic butter',
    measure: '2 oz',
    post_id: 3
  },
  {
    name: 'french fries',
    measure: '1 cup',
    post_id: 3
  },
  {
    name: 'steak seasoning',
    measure: '3 tsps',
    post_id: 3
  },
  
];

const seedIng = () => Ingredient.bulkCreate(ingdata);

module.exports = seedIng;
