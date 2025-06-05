const Chapter = require("../models/Chapter");
const redis = require("../config/redis");
const parseAndSaveChapters = require("../utils/parseJSONUpload");

exports.getChapters = async (req, res) => {
  const cacheKey = `chapters:${JSON.stringify(req.query)}`;
  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const query = {};
  const filters = ["class", "unit", "status", "weakChapter", "subject"];
  filters.forEach(f => { if (req.query[f]) query[f] = req.query[f]; });

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const chapters = await Chapter.find(query).skip(skip).limit(limit);
  const total = await Chapter.countDocuments(query);

  const result = { total, page, limit, chapters };
  await redis.setex(cacheKey, 3600, JSON.stringify(result));
  res.json(result);
};

exports.getChapterById = async (req, res) => {
  const chapter = await Chapter.findById(req.params.id);
  if (!chapter) return res.status(404).json({ error: "Chapter not found" });
  res.json(chapter);
};

exports.uploadChapters = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const failed = await parseAndSaveChapters(req.file.path);
  await redis.flushall();
  res.json({ message: "Chapters processed", failed });
};
