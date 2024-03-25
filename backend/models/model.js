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
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reference_no: {
            type: DataTypes.STRING,
            allowNull: false,
        }
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



export const DocumentType = sequelize.define(
    "DocumentType", {
    name: {
        type: DataTypes.ENUM("employee", "nonEmployee"),
        allowNull: false,
        unique: true
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}
);


export const documentRequest = sequelize.define(
    "documentRequest", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employeeStatus: {
        type: DataTypes.ENUM("employee", "nonEmployee"),
        allowNull: false,
    },
    is_agreed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
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


documentRequest.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.belongsTo(documentRequest, {
    foreignKey: 'user_id',
});



// DocumentType.belongsToMany(User, { through: 'UserDocument' });
// User.belongsToMany(DocumentType, { through: 'UserDocument' });


