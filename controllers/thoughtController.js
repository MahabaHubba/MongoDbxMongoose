const {ObjectId} = require('mongoose').Types;
const { Thought, User, reactionSchema } = require('../models');


module.exports = {

    //det alll thought users
    //Route works
    async getThought(req, res) {
        try{
            console.log('strart')
            const getThoughts = await Thought.find();
            res.json(getThoughts)
            console.log('end')
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Unable to get all thoguhts'})
        }
    },

    async getSingleThought(req, res) {
        try{
            console.log('start')
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v');

            if(!singleThought) {
                res.status(400).json({ mesage: 'Thought not found for id'})
            };

            res.json(singleThought);
            console.log('end');

        } catch (err) {
            res.status(500).json({ message: 'Unable to retrieve thoght id'});
            console.log(err);
        }
    },


};

