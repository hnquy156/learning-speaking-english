const { WordModel } = require('../models');

const get = (condition = {}) => {
  return WordModel.find(condition);
};

const getById = (id) => {
  return WordModel.findById(id);
};

const add = async (data) => {
  const word = new WordModel(data);
  return word.save();
};

const update = async (id, data) => {
  const word = await WordModel.findById(id);
  if (!word) throw new Error('Can not find word with id ' + id);
  return WordModel.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return WordModel.findByIdAndDelete(id);
};

module.exports = { get, getById, add, update, remove };
