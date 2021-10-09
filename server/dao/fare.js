const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fare', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    journeyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'journey',
        key: 'id'
      }
    },
    passengerHistoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'fare',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fare_journeyId_index",
        using: "BTREE",
        fields: [
          { name: "journeyId" },
        ]
      },
    ]
  });
};
