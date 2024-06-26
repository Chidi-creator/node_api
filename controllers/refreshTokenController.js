require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require('../model/User')

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "no cookies" });
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({refreshToken}).exec()
  if (!foundUser) return res.sendStatus(403);
  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)   return res.sendStatus(403);
      const roles = Object.values(foundUser.roles)
    const accessToken = jwt.sign(
      {
       userInfo: {
        username: decoded.username,
        roles
       }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
