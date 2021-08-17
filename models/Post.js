const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serving: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isDecimal: false
      }
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isDecimal: false
      }
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pic_buffer: {
      type: DataTypes.BLOB("long"),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post;