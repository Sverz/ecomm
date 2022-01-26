const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verifyTokenAndAuthorization = require("../middleware/verifyTokenAndAuthorization")
const verifyTokenAndAdmin = require("../middleware/verifyTokenAndAdmin")


const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id)
    res.status(200).json("User has been deleted...")
  } catch (err) {
    res.status(500).json(err)
  }
});
//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL USER
router.get("/findall", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router