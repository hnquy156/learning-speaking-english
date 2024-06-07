const getWord = async () => {
  try {
    const language = 'en-gb';
    const wordId = 'example';

    const appId = '';
    const apiKey = '';

    const res = await fetch(
      `https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/${language}/${wordId}`,
      {
        headers: {
          accept: 'application/json',
          app_id: appId,
          app_key: apiKey,
        },
        body: null,
        method: 'GET',
      }
    );
    console.log(await res.json());
  } catch (e) {
    console.log('getWord', e.message);
  }
};

module.exports = {
  getWord,
};
