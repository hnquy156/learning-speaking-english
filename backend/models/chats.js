const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    messages: {
      type: [
        {
          role: { type: String, required: true },
          content: { type: String, required: true },
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
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toObject: true,
    virtuals: true,
  }
);

module.exports = mongoose.model('chats', schema);
