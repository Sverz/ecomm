const Cart = require("../models/Cart");
const verifyTokenAndAuthorization = require("../middleware/verifyTokenAndAuthorization")
const verifyTokenAndAdmin = require("../middleware/verifyTokenAndAdmin")

const router = require("express").Router();
//CREATE
router.post("/add", verifyTokenAndAdmin, async (req, res) => {

  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart)
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete(req.params.id)
    res.status(200).json("Cart has been deleted...")
  } catch (err) {
    res.status(500).json(err)
  }
});
//GET Cart
router.get("/find/:userid", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.userId })
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL Cart
router.get("/allcart", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router