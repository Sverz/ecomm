const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

//register
router.post("/register", async (req, res) => {
    try {
console.log(req.body)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).json("Wrong login")

        const hashedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC);

        const Origpassword = hashedPass.toString(CryptoJS.enc.Utf8);

        if (Origpassword !== req.body.password)
            return res.status(401).json("Wrong password")

        const accesstoken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            { expiresIn: "1d" })
        const { password, ...others } = user._doc;

        return res.status(200).json({ ...others, accesstoken });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});
module.exports = router;