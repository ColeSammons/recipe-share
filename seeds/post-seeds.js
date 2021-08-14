const { Post } = require('../models');

const postdata = [
  {
    name: 'Steak Frites',
    serving: 5,
    time: 10,
    directions: 'Prepare a grill for medium-high heat. Bring potatoes, salt, and 1 quart water to a boil in a medium saucepan over medium-high heat. Reduce heat and simmer until tender, 12–14 minutes; drain. Grill potatoes, turning often with tongs, until lightly charred, 6–8 minutes.',
    notes: 'Transfer potatoes to skillet, breaking some in half with tongs. Toss to coat in miso butter. Add parsley; toss again.',
    pic_url: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/12/5/1/FNM_010112-WN-Dinners-046_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371603079722.jpeg',
    category: 'Dinner',
    user_id: 2
  },
  {
    name: 'Steak Frites',
    serving: 5,
    time: 10,
    directions: 'Prepare a grill for medium-high heat. Bring potatoes, salt, and 1 quart water to a boil in a medium saucepan over medium-high heat. Reduce heat and simmer until tender, 12–14 minutes; drain. Grill potatoes, turning often with tongs, until lightly charred, 6–8 minutes.',
    notes: 'Transfer potatoes to skillet, breaking some in half with tongs. Toss to coat in miso butter. Add parsley; toss again.',
    pic_url: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/12/5/1/FNM_010112-WN-Dinners-046_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371603079722.jpeg',
    category: 'Dinner',
    user_id: 4
  },
  {
    name: 'Steak Frites',
    serving: 5,
    time: 10,
    directions: 'Prepare a grill for medium-high heat. Bring potatoes, salt, and 1 quart water to a boil in a medium saucepan over medium-high heat. Reduce heat and simmer until tender, 12–14 minutes; drain. Grill potatoes, turning often with tongs, until lightly charred, 6–8 minutes.',
    notes: 'Transfer potatoes to skillet, breaking some in half with tongs. Toss to coat in miso butter. Add parsley; toss again.',
    pic_url: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/12/5/1/FNM_010112-WN-Dinners-046_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371603079722.jpeg',
    category: 'Dinner',
    user_id: 6
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
