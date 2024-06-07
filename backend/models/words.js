const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true,
    },
    translated: {
      type: String,
      required: true,
    },
    bookmarked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toObject: true,
    virtuals: true,
  }
);

module.exports = mongoose.model('words', schema);
