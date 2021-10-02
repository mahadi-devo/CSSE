module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fare', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      allowNull: false,
      references: {
        model: 'passengerhistory',
        key: 'id'
      }
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
        name: "fare_passengerHistory_index",
        using: "BTREE",
        fields: [
          { name: "passengerHistoryId" },
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
