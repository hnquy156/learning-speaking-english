const { ChatService } = require('../services');

const getChats = async (req, res, next) => {
  try {
    res.json({ data: await ChatService.get() });
  } catch (e) {
    next(e);
  }
};

const getChat = async (req, res, next) => {
  try {
    res.json({ data: await ChatService.getById(req.params.id) });
  } catch (e) {
    next(e);
  }
};

const updateChat = async (req, res, next) => {
  try {
    res.json({ data: await ChatService.update(req.body) });
  } catch (e) {
    next(e);
  }
};

const deleteChat = async (req, res, next) => {
  try {
    await ChatService.remove(req.params.id);
    res.json({ data: true });
  } catch (e) {
    next(e);
  }
};

module.exports = { getChats, getChat, updateChat, deleteChat };
