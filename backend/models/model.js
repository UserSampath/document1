import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";

// export const Admin = sequelize.define(
//     "Admin",
//     {
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         tableName: "Admin",
//     }
// );

// export const User = sequelize.define(
//     "User",
//     {
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         lastName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         phone: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         reference_no: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         }
//     },
//     {
//         tableName: "Users",
//     }
// );


// export const DocumentType = sequelize.define(
//     "DocumentType", {
//     name: {
//         type: DataTypes.ENUM("employee", "nonEmployee"),
//         allowNull: false,
//         unique: true
//     },
//     src: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// }
// );


// export const documentRequest = sequelize.define(
//     "documentRequest", {
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     employeeStatus: {
//         type: DataTypes.ENUM("employee", "nonEmployee"),
//         allowNull: false,
//     },
//     is_agreed: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     }
// }, {
//     tableName: "documentRequests",

// }
// )



// export const UserDocument = sequelize.define(
//     "UserDocument", {
//     is_agreed: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//         allowNull: false,
//     },
// }, { timestamps: false }
// );





// DocumentType.belongsToMany(User, { through: 'UserDocument' });
// User.belongsToMany(DocumentType, { through: 'UserDocument' });


export const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        reference_no: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM("employee", "nonEmployee"),
            allowNull: false,
        },

    },
    {
        tableName: "Users",
        timestamps: false
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
    type: {
        type: DataTypes.ENUM("employee", "nonEmployee"),
        allowNull: false,
    },
    is_need_attachment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},
    { timestamps: false }
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
        timestamps: false,
    }
);

export const UserDocument = sequelize.define(
    "UserDocument", {
    is_agreed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    attachment: {
        type: DataTypes.STRING,
    },
}
);

Document.belongsToMany(User, { through: 'UserDocument' });
User.belongsToMany(Document, { through: 'UserDocument' });