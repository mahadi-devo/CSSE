const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inspection', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    inspectionDate: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(45),
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
    inspectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'inspection',
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
        name: "inspection_journeyId_index",
        using: "BTREE",
        fields: [
          { name: "journeyId" },
        ]
      },
      {
        name: "inspection_inspectorId_index",
        using: "BTREE",
        fields: [
          { name: "inspectorId" },
        ]
      },
    ]
  });
};
