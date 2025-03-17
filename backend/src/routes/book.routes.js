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
      image: imageURL,
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

//pagination -> infinite loading
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const books = await Book.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "userName profileImage");

    const totalBooks = await Book.countDocuments();
    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("An Error occured in the getAll books route", error.message);
    res
      .status(500)
      .json({ error: "Internal server Error", message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id: bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    //check if the user is the created of the book
    if (book.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    //delete image from cloudinary

    // https://res.Cloudinary.com/deirm4uto/image/upload/v1741568358/qyup61vejflxxw8igvid.png

    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0]; // qyup61vejflxxw8igvid.png -> qyup61vejflxxw8igvid
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.log("Error deleting image from cloudinary", deleteError);
      }
    }

    //if the id matches
    await Book.deleteOne({ _id: bookId });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("An Error occured in the delete book route", error.message);
    res
      .status(500)
      .json({ error: "Internal server Error", message: error.message });
  }
});

export { router as bookRoutes };
