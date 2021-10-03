
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
    },
    accountID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'journey',
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
