const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedIng = require('./ingredient-seed');
const seedRate = require('./rate-seed');
const seedComment = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedIng();
  console.log('--------------');

  await seedRate();
  console.log('--------------');

  await seedComment();
  console.log('--------------');

  process.exit(0);
};

seedAll();
