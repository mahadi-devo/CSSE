module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "inspection",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: 'Normal Inspection'
      },
      journeyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "journey",
          key: "id",
        },
      },
      inspectorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employee",
          key: "id",
        },
      },
      inspectionLat: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      inspectionLong: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "inspection",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "inspection_journeyId_index",
          using: "BTREE",
          fields: [{ name: "journeyId" }],
        },
        {
          name: "inspection_inspectorId_index",
          using: "BTREE",
          fields: [{ name: "inspectorId" }],
        },
      ],
    }
  );
};
