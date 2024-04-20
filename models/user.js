'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
       if (user.password) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      
        if (!user.role_id) {
          const roleUser = await sequelize.models.Role.findOne({ where: { name: 'user' } });
          user.role_id = roleUser.id;
        }
      },
    },
    sequelize,
    modelName: 'User',
  });
  User.prototype.CorrectPassword = async (reqPassword, passwordDb) => {
    return await bcrypt.compareSync(reqPassword, passwordDb);
  }  
  return User;
};