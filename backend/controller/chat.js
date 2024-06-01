const getChats = (req, res, next) => {
  try {
    res.json({ message: 'List chats' });
  } catch (e) {
    next(e);
  }
};

module.exports = { getChats };
