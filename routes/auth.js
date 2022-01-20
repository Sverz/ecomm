const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken")

//register
router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(201).json(err);
    }
});



router.post("/refresh", (req, res) => {
    const refreshtoken = req.body.token;
    if (!refreshtoken)
        return res.status(401)
            .json("You are not authenticated!")

    jwt.verify(refreshtoken, process.env.JWTref_SEC, (err, user) => {
        console.log()
        err && console.log(err);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.status(200).json({
            accesstoken: newAccessToken,
            refreshtoken: newRefreshToken,
        });
    });


});

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
    },
        process.env.JWT_SEC,
        { expiresIn: "1d" })
};

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
    },
        process.env.JWTref_SEC,
    )
};
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

        generateAccessToken(user);
        generateRefreshToken(user);

        const accesstoken = generateAccessToken(user);
        const refreshtoken = generateRefreshToken(user);
        const { password, ...others } = user._doc;

        return res.status(200).json({ ...others, accesstoken, refreshtoken });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});
router.post("/logout", verifyTokenAndAuthorization, async (req, res) => {
    try {

    } catch {

    }

})

module.exports = router