import { Router } from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.model.js";
import { protectRoute } from "../../middleware/protectRoute.middleware.js";

const router = Router();

router.use(protectRoute);
router.post("/", async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!image || !title || !caption || !rating)
      res.status(400).json({ error: "All fields are required" });

    //upload image to cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(image);

    const imageURL = uploadedResponse.secure_url; //from the response get the image URL
    //save to mongdb
    const newBook = new Book({
      title,
      caption,
      rating,
      image,
      user: req.user._id,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.log("An Error occured in the create-book route", error.message);
    res
      .status(500)
      .json({ error: "Internal server Error", message: error.message });
  }
});

export { router as bookRoutes };
