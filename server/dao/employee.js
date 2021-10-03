const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    employeeTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employeetype',
        key: 'id'
      }
    },
    age: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee',
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
        name: "employee_employeeTypeId_index_fx_idx",
        using: "BTREE",
        fields: [
          { name: "employeeTypeId" },
        ]
      },
    ]
  });
};
