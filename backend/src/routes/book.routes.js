import { Router } from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.model.js";
import { protectRoute } from "../../middleware/protectRoute.middleware.js";

const router = Router();

router.use(protectRoute);
router.post("/", async (req, res) => {});

export { router as bookRoutes };
