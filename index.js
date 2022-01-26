const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const cors = require("cors")
dotenv.config();
try {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("DBConnection Successfull!"))
        .catch((err) => {
            console.log(err);
        });

    app.use(cors());
    app.use(express.json({ extended: true }));
    app.use("/api/user", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/product", productRoute);
    app.use("/api/order", orderRoute);
    app.use("/api/cart", cartRoute);


    app.listen(process.env.PORT || 5000, () => {
        console.log("Backend server is running!");
    });
} catch (err) { console.log(err); }