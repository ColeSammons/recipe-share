const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rate extends Model { }

Rate.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isDecimal: false,
                islessThan(value) {
                    if (value > 5 | value < 1) {
                      throw new Error('Rating is be out of 5 and not less than 1');
                    }
                  }
            }
        },
        update: {
            type: DataTypes.STRING,
            allowNull:false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'rate'
    }
);

module.exports = Rate;
