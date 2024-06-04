const { ChatModel } = require('../models');
const { OpenAIUtils } = require('../utils');

const get = () => {
  return ChatModel.find({ is_deleted: false });
};

const getById = (id) => {
  return ChatModel.findOne({ is_deleted: false, _id: id });
};

const add = async (content) => {
  const messages = OpenAIUtils.initMessages(content);
  const message = await OpenAIUtils.createChat(messages);
  messages.push(message);
  const chat = new ChatModel({ messages });
  return chat.save();
};

const update = async (id, chat) => {
  const message = await OpenAIUtils.createChat(chat.messages);
  chat.messages.push(message);
  return ChatModel.findByIdAndUpdate(id, chat, {
    new: true,
  });
};

const remove = (id) => {
  return ChatModel.findByIdAndUpdate(id, { is_deleted: true });
};

module.exports = { get, getById, add, update, remove };
