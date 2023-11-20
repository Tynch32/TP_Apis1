const router = require('express').Router();
const {index,show} = require('../../controllers/apiGenresController');

/* /api/v1/movies */

router.get('/', index);
router.get('/:id', show);

module.exports = router;