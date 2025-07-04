import express from "express";
import upload from "../middlewares/upload";
import {
  createZap,
  getZapByShortId,
  // shortenUrl,
} from "../controllers/zap.controller";

const router = express.Router();

router.post("/upload", upload.single("file"), createZap);
// router.post("/shorten", (req, res) => shortenUrl(req, res));
router.get("/:shortId", getZapByShortId);

export default router;
