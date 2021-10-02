const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('route', {
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
    },
    stopCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'route',
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
    ]
  });
};
