
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
        name: "ticket_ticketTypeId_index_fk_idx",
        using: "BTREE",
        fields: [
          { name: "tickettypeId" },
        ]
      },
    ]
  });
};
