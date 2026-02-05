const jwt = require("jsonwebtoken");

const SECRET_KEY = require("../config/config.default").secretKey;

const { promisify } = require("util");
const toJwtAsync = promisify(jwt.sign);
const toJwtVerifyAsync = promisify(jwt.verify);

module.exports.createToken = async (payload, expiresIn = "1h") => {
  const token = await toJwtAsync(payload, SECRET_KEY, { expiresIn });

  return token;
};

module.exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await toJwtVerifyAsync(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
