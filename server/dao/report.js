
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    reportTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reporttype',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'report',
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
        name: "report_reportTypeId_idx",
        using: "BTREE",
        fields: [
          { name: "reportTypeId" },
        ]
      },
    ]
  });
};
