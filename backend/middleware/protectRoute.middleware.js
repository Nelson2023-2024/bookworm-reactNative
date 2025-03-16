import jwt from "jsonwebtoken";
import User from "../src/models/User.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    //get token
    const token = req.header("Authorization").replace("Bearer ", "");

    console.log("Request Header:", req.header);

    if (!token)
      return res
        .status(401)
        .json({ message: "No authorization token, access denied" });

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find USer
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "Token is not valid" });
    //if everthing is okay
    req.user = user;

    next()
  } catch (error) {
    console.log("An Error occured protecting the route", error.message);
    res
      .status(500)
      .json({ error: "Internal server Error", message: error.message });
  }
};
