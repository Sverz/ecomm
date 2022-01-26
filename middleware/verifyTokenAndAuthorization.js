const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

const verifyTokenAndAuthorization = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
         next();
      } else {
         res.status(403).json("You are not alowed to do that!");
      }
   });
};
module.exports = verifyTokenAndAuthorization;