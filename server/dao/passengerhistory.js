
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
      allowNull: false
    },
    destinationLong: {
      type: DataTypes.STRING(45),
      allowNull: false
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
