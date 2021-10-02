module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fine', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    inspectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'inspection',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'fine',
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
        name: "fine_accountId_index_fk_idx",
        using: "BTREE",
        fields: [
          { name: "accountId" },
        ]
      },
      {
        name: "fine_inspectionId_index",
        using: "BTREE",
        fields: [
          { name: "inspectionId" },
        ]
      },
    ]
  });
};
