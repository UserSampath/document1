import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";


export const Challenge = sequelize.define(
    "Challenge",
    {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        risk_point_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("step", "calories", "exercise"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        winner: {
            type: DataTypes.ENUM("Created User", "Accepted User", "No Winners"),
        }
    },
    {
        tableName: "Challenge",
    }
);


export const DiscountChallenge = sequelize.define(
    "DiscountChallenge",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("step", "calories", "exercise"),
            allowNull: false,
        },
        target: {
            type: DataTypes.ENUM("All", "Premium"),
            allowNull: false,
        },
        discount_type: {
            type: DataTypes.ENUM("price", "delivery"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        discount_amount: {
            type: DataTypes.INTEGER,
        },

    },
    {
        tableName: "DiscountChallenge",
    }
);

export const Discount = sequelize.define(
    "Discount",
    {
        discount_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("price", "delivery"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: "Discount",
    }
);


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
        image: {
            type: DataTypes.STRING,
        },
        premiumEndDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        points: {
            type: DataTypes.INTEGER,
        },
        notificationToken: {
            type: DataTypes.STRING,
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

export const Payments = sequelize.define(
    "Payments", {
    customerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,

    }
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

export const OrderProduct = sequelize.define(
    "OrderProduct", {
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, { timestamps: false }
);

export const Order = sequelize.define(
    "Order",
    {
        isAccepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    { timestamps: true }
);


// Associations
User.hasMany(Challenge, {
    as: 'created_user',
    foreignKey: "created_user_id",
    onDelete: 'CASCADE',
});
Challenge.belongsTo(User, {
    as: 'created_user',
    foreignKey: "created_user_id",
});

User.hasMany(Challenge, {
    as: 'challenged_user',
    foreignKey: "challenged_user_id",
    onDelete: 'CASCADE',
});
Challenge.belongsTo(User, {
    as: 'challenged_user',
    foreignKey: "challenged_user_id",
});

Products.belongsToMany(Order, { through: 'OrderProduct' });
Order.belongsToMany(Products, { through: 'OrderProduct' });

User.hasMany(Order, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Order.belongsTo(User, {
    foreignKey: "user_id",
})

User.hasMany(Payments, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'

});
Payments.belongsTo(User, {
    foreignKey: "user_id",

});

User.hasMany(Discount, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'

});
Discount.belongsTo(User, {
    foreignKey: "user_id",
});

DiscountChallenge.hasMany(Discount, {
    foreignKey: "discount_challenge_id",

});
Discount.belongsTo(DiscountChallenge, {
    foreignKey: "discount_challenge_id",
});


