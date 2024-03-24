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


export const documentRequest = sequelize.define(
    "documentRequest ", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeeStatus:{
            type: DataTypes.ENUM("employee","nonEmployee"),
            allowNull: false,
        },
        is_agreed:{
            type: DataTypes.ENUM("true","false"),
            allowNull: false,
        }
    },{
        tableName: "documentRequests",

    }
)

export const UserDocument = sequelize.define(
    "UserDocument", {
        is_agreed: {
            type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, { timestamps: false }
);

Document.belongsToMany(User, { through: 'UserDocument' });
User.belongsToMany(Document, { through: 'UserDocument' });


