const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        categories: { type: Array },
        img: { type: String, required: true },
        size: { type: String },
        color: { type: Array },
        price: { type: Number, required: true },
        InStock: { type: Boolean, default: true },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Products", ProductsSchema)