import express from "express";
import upload from "../middlewares/upload";
import {
  createZap,
  getZapByShortId,
  // shortenUrl,
} from "../controllers/zap.controller";
import rateLimit from "express-rate-limit";

const notFoundLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 20, // allow 20 invalid IDs per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip ?? "unknown",

    // Count ONLY failed (404) responses
    requestWasSuccessful: (_req, res) => {
        return res.statusCode !== 404;
    },

    message: {
        error: "Too many invalid Zap IDs. Slow down.",
    },
});

const router = express.Router();

router.post("/upload", upload.single("file"), createZap);
// router.post("/shorten", (req, res) => shortenUrl(req, res));
router.get("/:shortId", notFoundLimiter, getZapByShortId);

export default router;
