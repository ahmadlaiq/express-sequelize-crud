'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Nama sudah digunakan'
      },
      validate: {
        notNull: {
          msg: 'Nama tidak boleh kosong'
        }
      }
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Harga tidak boleh kosong'
        },
        isNumeric: {
          msg: 'Harga harus berupa angka'
        },
        min: {
          args: [1],
          msg: 'Harga minimal 1'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      validate: {
        notNull: {
          msg: 'Kategori tidak boleh kosong'
        },
        isExist(value) {
          return sequelize.models.Category.findByPk(value).then((el) => {
            if (!el) {
              throw new Error('Kategori tidak ditemukan')
            }
          })
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image tidak boleh kosong'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    countReview: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};