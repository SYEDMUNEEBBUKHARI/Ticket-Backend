/* eslint-disable no-unused-vars */
const { Sequelize, Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    static associate(models) {
      // define association here
      Tickets.belongsTo(models.Users, { foreignKey: 'userId' })
    }
  }

  Tickets.init(
    {
      // table definition
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      todos: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    },
    {
      // timestamps: false,
      modelName: 'Tickets',
      sequelize,
    }
  )

  return Tickets
}
