import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { generateToken } from "../../utils/generateToken.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    if (!email || !userName || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters long" });

    if (userName.length < 3)
      return res
        .status(400)
        .json({ message: "UserName should be at least 3 characters long" });

    //check if user already exists email or userName
    // const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const existingUsername = await User.findOne({ userName });
    if (existingUsername)
      return res.status(400).json({ message: "Username already taken" });

    //get a random avartar
    const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${userName}`;

    const hashPass = await bcrypt.hash(password, 10);

    //if the user doent exist create one
    const user = new User({
      email,
      password: hashPass,
      userName,
      profileImage,
    });
    await user.save();

    const token = await generateToken(user._id);

    res.status(201).json({
      token: token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("An Error occured in the Register route", error.message);
    res
      .status(500)
      .json({ error: "Internal server Error", message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const emailExist = await User.findOne({ email });

    if (!emailExist)
      return res.status(404).json({ message: "Invalid credentials" });

    const comparePass = await bcrypt.compare(password, emailExist.password);

    if (!comparePass)
      return res.status(400).json({ message: "Invalid credentials" });

    //if password match generate token

    const token = await generateToken(emailExist._id);

    return res.status(200).json({
      token,
      user: {
        id: emailExist._id,
        email: emailExist.email,
        username: emailExist.userName,
        profileImage: emailExist.profileImage,
      },
    });
  } catch (error) {
    console.log("An Error occured in the Login route", error.message);
    res
      .status(500)
      .json({ error: "Internal server Error", message: error.message });
  }
});

export { router as authRoutes };
