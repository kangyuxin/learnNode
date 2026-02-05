const { User } = require("../model");
const { createToken } = require("../utils/jwt");

// 用户注册逻辑
exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const newUser = new User({
      username,
      password,
      email,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 用户登录逻辑
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = await createToken({ id: user._id, username: user.username });
    res.status(200).json({ message: { ...user.toJSON(), token } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.list = async (req, res) => {
  res.send("/user/list");
};
