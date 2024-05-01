const router = require('express').Router();

const { 
    getThought, 
    getSingleThought, 
    createThought, 
    updateThought

} = require('../../controllers/thoughtController')

// api/thoughts
router.route('/').get(getThought).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)



module.exports = router;