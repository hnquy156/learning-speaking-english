const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    messages: {
      type: [
        {
          role: String,
          content: String,
        },
      ],
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('chats', schema);
