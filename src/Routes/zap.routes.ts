import express from "express";
import upload from "../middlewares/upload";
import {
  createZap,
  getZapByShortId,
  // shortenUrl,
} from "../controllers/zap.controller";
import {
  uploadLimiter,
  downloadLimiter,
  zapPasswordAttemptLimiter,
} from "../middlewares/rateLimiter";

const router = express.Router();

/**
 * POST /api/zaps/upload
 * Rate limit: 10 requests / min per IP  (uploadLimiter)
 * Also triggers QR code generation — compute-heavy, kept strict.
 */
router.post("/upload", uploadLimiter, upload.single("file"), createZap);

/**
 * GET /api/zaps/:shortId
 * Rate limit: 30 requests / min per IP  (downloadLimiter)
 * Prevents bulk scraping / automated mass-download of shared content.
 */
router.get("/:shortId", downloadLimiter, zapPasswordAttemptLimiter, getZapByShortId);

// router.post("/shorten", (req, res) => shortenUrl(req, res));

export default router;
