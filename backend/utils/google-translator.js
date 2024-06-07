const { translate, speak } = require('google-translate-api-x');

const translateToVI = async (content = 'I spea Vietnames!') => {
  const res = await translate(content, {
    from: 'en',
    to: 'vi',
    autoCorrect: true,
  });
  
  return {
    corrected: res.from.text.value,
    translated: res.text,
    original: content,
  };
};

module.exports = {
  translateToVI,
};
