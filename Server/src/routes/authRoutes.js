import express from "express";
import { login, register, getProfile} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/login", login);
router.post("/register", register);


export default router;