const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   const authHeader = req.headers.token;
   if (!authHeader) return res.status(401).json("You are not authentificated");
   const token = authHeader.split(" ")[1];
   jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
   });

};
module.exports = verifyToken;