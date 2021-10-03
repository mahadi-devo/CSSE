
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
    journeyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'journey',
        key: 'id'
      }
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
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
    ]
  });
};
