const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")

dotenv.config();
try {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("DBConnection Successfull!"))
        .catch((err) => {
            console.log(err);
        });


    app.use(express.json());
    app.use("/routes/user", userRoute);
    app.use("/routes/auth", authRoute);
    app.use("/routes/product", productRoute);
    app.use("/routes/order", orderRoute);
    app.use("/routes/cart", cartRoute);


    app.listen(process.env.PORT || 5000, () => {
        console.log("Backend server is running!");
    });
} catch (err) { console.log(err); }