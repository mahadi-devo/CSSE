const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'passengers',
        key: 'id'
      }
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    creditAmount: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "100"
    },
    updatedDate: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    passengerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'account',
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
        name: "account_passenger_index",
        using: "BTREE",
        fields: [
          { name: "passengerId" },
        ]
      },
    ]
  });
};
