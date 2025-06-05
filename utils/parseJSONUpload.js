const fs = require("fs").promises;
const Chapter = require("../models/Chapter");

async function parseAndSaveChapters(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(data);
  const failed = [];

  for (const item of json) {
    try {
      const chapter = new Chapter(item);
      await chapter.save();
    } catch (err) {
      failed.push({ item, error: err.message });
    }
  }
  return failed;
}

module.exports = parseAndSaveChapters;
