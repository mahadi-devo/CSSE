module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('normal','semi','luxuary'),
      allowNull: false,
      defaultValue: "normal"
    },
    driverName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "UNKNOWN"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'bus',
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
    ]
  });
};
