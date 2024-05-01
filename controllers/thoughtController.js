const {ObjectId} = require('mongoose').Types;
const { Thought, User, reactionSchema } = require('../models');


module.exports = {

    //get all thought users
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

    //Single thought working
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
// Create Thought works (POST)
    async createThought(req, res) {
        try{
            console.log('start')
              const thought = await Thought.create(req.body);
              const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id} },
                { runValidators: true, new: true }
              );
              if(!user) {
                return res.status(404).json({message: 'Unable to find user with that id'})
              };
              res.json('Created thought');
              console.log('end')
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Failed create Thought'})
        }
    },

    async updateThought(req, res) {
        try{
            console.log('start');
            const updateThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body}, 
                {runValidators: true, new: true}
            );
            if(!updateThought){
                res.status(404).json({ message: 'No Thought to update'})
            };
            res.json(updateThought);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Unable to update Thought'})
        }
    }



};

