const { WordService } = require('../services');

const getWords = async (req, res, next) => {
  try {
    res.json({ data: await WordService.get() });
  } catch (e) {
    next(e);
  }
};

const getWord = async (req, res, next) => {
  try {
    res.json({ data: await WordService.getById(req.params.id) });
  } catch (e) {
    next(e);
  }
};

const createWord = async (req, res, next) => {
  try {
    if (!req.body.original || !req.body.translated)
      throw new Error('You must provide a original and translated');

    res.json({ data: await WordService.add(req.body) });
  } catch (e) {
    next(e);
  }
};

const updateWord = async (req, res, next) => {
  try {
    if (!req.body.original || !req.body.translated)
      throw new Error('You must provide a original and translated');

    res.json({
      data: await WordService.update(req.params.id, req.body),
    });
  } catch (e) {
    next(e);
  }
};

const deleteWord = async (req, res, next) => {
  try {
    await WordService.remove(req.params.id);
    res.json({ data: true });
  } catch (e) {
    next(e);
  }
};

module.exports = { getWords, getWord, createWord, updateWord, deleteWord };
