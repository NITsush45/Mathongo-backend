const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const chapterController = require("../controllers/chapterController");
const adminOnly = require("../middlewares/adminOnly");

router.get("/", chapterController.getChapters);
router.get("/:id", chapterController.getChapterById);
router.post("/", adminOnly, upload.single("file"), chapterController.uploadChapters);

module.exports = router;
