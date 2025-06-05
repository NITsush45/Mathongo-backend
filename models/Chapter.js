const mongoose = require('mongoose');

const yearWiseSchema = new mongoose.Schema({
  "2019": Number,
  "2020": Number,
  "2021": Number,
  "2022": Number,
  "2023": Number,
  "2024": Number,
  "2025": Number
}, {_id: false});

const chapterSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics']
  },
  chapter: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: String,
    required: true,
    enum: ['Class 11', 'Class 12']
  },
  unit: {
    type: String,
    required: true
  },
  yearWiseQuestionCount: {
    type: yearWiseSchema,
    required: true
  },
  questionSolved: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed']
  },
  isWeakChapter: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });
chapterSchema.index({ class: 1, subject: 1 });
chapterSchema.index({ unit: 1, status: 1 });
chapterSchema.index({ isWeakChapter: 1 });

chapterSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Chapter', chapterSchema);