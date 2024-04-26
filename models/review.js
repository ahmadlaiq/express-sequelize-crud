'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Review.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'UserId tidak boleh kosong'
        },
        isExist(value) {
          return sequelize.models.User.findByPk(value).then((user) => {
            if (!user) {
              throw new Error('UserId not found');
            }
          });
        }
      }
    },
    productId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ProductId tidak boleh kosong'
        },
        isExist(value) {
          return sequelize.models.Product.findByPk(value).then((product) => {
            if (!product) {
              throw new Error('ProductId not found');
            }
          });
        }
      }
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Point tidak boleh kosong'
        },
        isNumeric: {
          msg: 'Point harus berupa angka'
        },
        min: {
          args: [1],
          msg: 'Point minimal 1'
        },
        max: {
          args: [5],
          msg: 'Point maksimal 5'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Content tidak boleh kosong'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};