const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('passengerhistory', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    depatureLat: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    depatureLong: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    destinationLat: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    destinationLong: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    journeyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'journey',
        key: 'id'
      }
    },
    fineId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fine',
        key: 'id'
      }
    },
    fareId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fare',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'passengerhistory',
    timestamps: true,
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
        name: "passengerhistory_fk_accountid_idx",
        using: "BTREE",
        fields: [
          { name: "accountId" },
        ]
      },
      {
        name: "passengerhistory_fk_journeyid_idx",
        using: "BTREE",
        fields: [
          { name: "journeyId" },
        ]
      },
      {
        name: "passengerhistory_fineId_idx",
        using: "BTREE",
        fields: [
          { name: "fineId" },
        ]
      },
      {
        name: "passengerhistory_fareId_index",
        using: "BTREE",
        fields: [
          { name: "fareId" },
        ]
      },
    ]
  });
};
