import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";

export const Admin = sequelize.define(
    "Admin",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Admin",
    }
);

export const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING,
        },
        otpExpiryTime: {
            type: DataTypes.DATE,
        },

    },
    {
        tableName: "Users",
    }
);

export const Products = sequelize.define(
    "Products", {
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}
);

export const Document = sequelize.define(
    "Document", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}
);

export const UserDocument = sequelize.define(
    "UserDocument", {
    status: {
            type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, { timestamps: false }
);

Document.belongsToMany(User, { through: 'UserDocument' });
User.belongsToMany(Document, { through: 'UserDocument' });

// Associations
// User.hasMany(Challenge, {
//     as: 'created_user',
//     foreignKey: "created_user_id",
//     onDelete: 'CASCADE',
// });
// Challenge.belongsTo(User, {
//     as: 'created_user',
//     foreignKey: "created_user_id",
// });

// User.hasMany(Challenge, {
//     as: 'challenged_user',
//     foreignKey: "challenged_user_id",
//     onDelete: 'CASCADE',
// });
// Challenge.belongsTo(User, {
//     as: 'challenged_user',
//     foreignKey: "challenged_user_id",
// });

// Products.belongsToMany(Order, { through: 'OrderProduct' });
// Order.belongsToMany(Products, { through: 'OrderProduct' });

// User.hasMany(Order, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// })
// Order.belongsTo(User, {
//     foreignKey: "user_id",
// })

// User.hasMany(Payments, {
//     foreignKey: "user_id",
//     onDelete: 'CASCADE'

// });
// Payments.belongsTo(User, {
//     foreignKey: "user_id",

// });

// User.hasMany(Discount, {
//     foreignKey: "user_id",
//     onDelete: 'CASCADE'

// });
// Discount.belongsTo(User, {
//     foreignKey: "user_id",
// });

// DiscountChallenge.hasMany(Discount, {
//     foreignKey: "discount_challenge_id",

// });
// Discount.belongsTo(DiscountChallenge, {
//     foreignKey: "discount_challenge_id",
// });


