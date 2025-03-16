import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    try {
        
    } catch (error) {
        console.log("An Error occured in the create-book route", error.message);
    res
      .status(500)
      .json({ error: "Internal server Error", message: error.message });
    }
});

export { router as bookRoutes };
