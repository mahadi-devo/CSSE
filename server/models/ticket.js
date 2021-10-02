const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    validityPeriod: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    issuedLocation: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tickettypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tickettype',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ticket',
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
        name: "ticket_ticketTypeId_index_fk_idx",
        using: "BTREE",
        fields: [
          { name: "tickettypeId" },
        ]
      },
    ]
  });
};
