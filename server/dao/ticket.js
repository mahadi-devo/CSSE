module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ticket",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      issuedLocationLat: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      issuedLocationLong: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      validityPeriod: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      destinationLat: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      destinationLong: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      qrCode: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ticketTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tickettype",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "ticket",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "ticket_ticketTypeId_index_fk_idx",
          using: "BTREE",
          fields: [{ name: "tickettypeId" }],
        },
      ],
    }
  );
};
