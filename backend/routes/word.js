const { WordController } = require('../controllers');

const router = require('express').Router();

router.get('/', WordController.getWords);
router.get('/:id', WordController.getWord);
router.post('/', WordController.createWord);
router.put('/:id', WordController.updateWord);
router.delete('/:id', WordController.deleteWord);

module.exports = router;
