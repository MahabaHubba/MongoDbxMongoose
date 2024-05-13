const {ObjectId} = require('mongoose').Types;
const { Thought, User, reactionSchema} = require('../models');


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

// Updating Thought works
    async updateThought(req, res) {
        try{
            console.log('start');
            const updateThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body}, 
                {runValidators: true, new: true}
            );
            if(!updateThought){
                res.status(404).json({ message: 'No Thought id to update'})
            };
            res.json(updateThought);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Unable to update Thought'})
        }
    },
    // Is able to delete
    async deleteThought(req, res) {
        try{
            console.log('start');
             const deleteThought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
             if(!deleteThought) {
                res.status(404).json({ message: 'Unable to find thought to delete'})
             }
             console.log('end')
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: '500 error to delete thought'})
        }
    },

    //To create a reaction // Does not work for reaction body
   async createReaction(req, res) {
    try{
        console.log('start');
        const addReaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: { reactions: req.body} },
            {runValidators: true, new: true}
        )

        if(!addReaction) {
            return res.status(404).json({ message: "unable to add reaction error 404"})
        }

        res.json(addReaction);

        console.log('end')
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Unable to create Reaction internal error'})
    }
   },
    
   async deleteReaction(req, res) {
    try{
        const deleteReaction = await Thought.findOneAndRemove(
            {_id: req.params.thoughtId},
            {$pull: {reactions:{_id: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        if(!deleteReaction) {
            res.status(400).json({ message: 'Unable to find reaction data user'})
        }
        console.log('end')
    }catch (error) {
        console.log(error);
        res.status(500).json({message: 'Unable to delete Reaction internal error'})
    }
   }

};

