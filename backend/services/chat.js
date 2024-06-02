const { ChatModel } = require('../models');

const get = async () => {
  return ChatModel.find({ is_deleted: false });
};

const getById = async (id) => {
  return ChatModel.findOne({ is_deleted: false, _id: id });
};

const update = async (chat) => {
  return ChatModel.findByIdAndUpdate(chat.id, chat, {
    new: true,
    upsert: true,
  });
};

const remove = async (id) => {
  return ChatModel.findByIdAndUpdate(id, { is_deleted: true });
};

module.exports = { get, getById, update, remove };
