
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
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
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'paymentmethod',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'payment',
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
        name: "payment_paymentMethod_index_fk_idx",
        using: "BTREE",
        fields: [
          { name: "paymentMethodId" },
        ]
      },
    ]
  });
};
