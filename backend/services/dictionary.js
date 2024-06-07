const { GoogleTranslateUtils } = require('../utils');

const translateByGG = (content) => {
  return GoogleTranslateUtils.translateToVI(content);
};

module.exports = { translateByGG };
