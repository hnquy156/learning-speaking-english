const router = require('express').Router();
const { DictionaryController } = require('../controllers');

router.get('/google', DictionaryController.getGoogleWord);

module.exports = router;
