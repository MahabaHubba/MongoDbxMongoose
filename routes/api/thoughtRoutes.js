const router = require('express').Router();

const { 
    getThought, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought, 
    createReaction,
    deleteReaction

} = require('../../controllers/thoughtController')

// api/thoughts
router.route('/').get(getThought).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions/:reactionId').post(createReaction).delete(deleteReaction);

module.exports = router;