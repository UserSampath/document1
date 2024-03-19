import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.connection.js";
import adminRoutes from "./routes/admin.router.js";
import userRoutes from "./routes/user.router.js";
import challengeRoute from "./routes/challenge.route.js"
import paymentRoute from "./routes/payment.router.js";
import productRoute from "./routes/product.router.js";
import OrderRoute from "./routes/order.route.js";
import NotificationRoute from "./routes/notification.route.js"
import discountChallengeRoute from "./routes/discountChallenge.route.js"
import discountRoute from "./routes/discount.route.js"


const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type",
        "Content-Type: multipart/form-data"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//connect database
sequelize
    .authenticate()
    .then(() => {
        console.log("connection has been established successfully");
    })
    .catch((error) => {
        console.error("unable connect to the database: ", error);
    });

//Table creation
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("tables created");
    })
    .catch((error) => {
        console.error("unable to create tables: ", error);
    });

// Main Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/challenge", challengeRoute);
app.use("/payment", paymentRoute);
app.use("/product", productRoute);
app.use("/order", OrderRoute);
app.use("/notification", NotificationRoute);
app.use("/discountChallenge", discountChallengeRoute);
app.use("/discount", discountRoute);




//run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
