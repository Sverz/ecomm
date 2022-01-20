const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        categories: { type: Array },
        img: { type: String, required: true },
        size: { type: String },
        color: { type: String },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Products", ProductsSchema)