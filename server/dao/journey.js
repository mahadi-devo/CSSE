const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('journey', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bus',
        key: 'id'
      }
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'route',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'journey',
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
        name: "journey_busId_index_fk_idx",
        using: "BTREE",
        fields: [
          { name: "busId" },
        ]
      },
      {
        name: "journey_routeId_index_fk_idx",
        using: "BTREE",
        fields: [
          { name: "routeId" },
        ]
      },
    ]
  });
};
