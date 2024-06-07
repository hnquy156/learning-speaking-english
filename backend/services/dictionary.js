const { GoogleTranslateUtils } = require('../utils');

const translateByGG = (content) => {
  return GoogleTranslateUtils.translateToVI(content);
};

const speakByGG = (content) => {
  return GoogleTranslateUtils.speakToEN(content);
};

module.exports = { translateByGG, speakByGG };
