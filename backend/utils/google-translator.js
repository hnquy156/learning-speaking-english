const { translate, speak } = require('google-translate-api-x');

const translateToVI = async (content) => {
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

const speakToEN = async (content) => {
  const res = await speak(content, { to: 'en', autoCorrect: true });
  return res;
};

module.exports = {
  translateToVI,
  speakToEN,
};
