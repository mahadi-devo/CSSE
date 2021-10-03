module.exports = function(sequelize, DataTypes) {
    return sequelize.define('account', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'passengers',
                key: 'id'
            }
        },
        creditAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 100
        },
        passengerId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        qrCode: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'employee',
                key: 'id'
            }
        },
        accountTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: 'accounttype',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'account',
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
                name: "account_passenger_index",
                using: "BTREE",
                fields: [
                    { name: "passengerId" },
                ]
            },
            {
                name: "account_accountType_index",
                using: "BTREE",
                fields: [
                    { name: "accountTypeId" },
                ]
            },
            {
                name: "account_employeeId_index",
                using: "BTREE",
                fields: [
                    { name: "employeeId" },
                ]
            },
        ],
        hooks: {
            beforeCreate(account) {
                account.password =
                    account.password && bcrypt.hashSync(account.password, 10);
            },
            beforeUpdate(account) {
                account.password =
                    account.password && bcrypt.hashSync(account.password, 10);
            },
        },
    });
};
