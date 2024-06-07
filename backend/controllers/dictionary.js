const { DictionaryService } = require('../services');

const getGoogleWord = async (req, res, next) => {
  try {
    res.json({ data: await DictionaryService.translateByGG(req.query.q) });
  } catch (e) {
    next(e);
  }
};

const getGoogleSpeaking = async (req, res, next) => {
  try {
    res.json({ data: await DictionaryService.speakByGG(req.query.q) });
  } catch (e) {
    next(e);
  }
};

module.exports = { getGoogleWord, getGoogleSpeaking };
