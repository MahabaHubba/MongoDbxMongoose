const {User, Thought} = require('../models');


module.exports = {
    //Get all users
    async getUsers (req, res) {
        try {
            console.log('start')
            const users = await User.find();
            res.json(users)
            console.log('end');

        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    //GET user by Id
    async getSingleUser(req, res) {
        try{
            const singleUser = await User.findOne({ _id: req.params.userId});
            if(!singleUser) {
                return res.status(404).json({ message: 'No user available with that Id'})
            }
            res.json(singleUser)
        } catch(err) {
            res.status(500).json(err);
        }
    },
    //POST request
    async createUser(req, res) {
        try{
            console.log('start')
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            console.log(err);
            return res.json(500).json(err)

        }
    },

    //Update a Courese (Unable to update) (1)
    async updateUser(req, res) {
        try{
            console.log('start')
            const userUpdate = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            console.log('end')
            if(!userUpdate) {
                res.status(404).json({ message: 'No user found to update'})
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Is able to delete

    async deleteUser(req, res) {
        try{
            console.log('start');
            const userDelete = await User.findOneAndRemove({_id: req.params.userId});
            if(!userDelete) {
                res.status(404).json({ message: 'Unable to find user to delete'})
            }

            const thought = await Thought.find({ username: user.username});
            if(thought.length > 0 ) {
                await Thought.deleteMany({ username: user.username})
            } else {
                res.json({ message : 'User and associaitno has been dleted'})
            }
            console.log('end')
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UNable to add friend (2)
    async addFriend(req, res) {
        console.log('You are adding a friend')
        console.log(req.body);

        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: {friends: req.body}},
                {runValidators: true, new: true}
            );

            if(!friend) {
                return res.status(404).json({ message: 'No friend found with that iD'})
            }
            res.json(friend);
        } catch(err) {
            res.status(500).json({ message: 'Unable to add friend'})
        }
    },

    //Unable to remove friend
    async removeFriend(req, res) {
        try{
            console.log('start')
            const friend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: { friends: { friendId: req.params.friendId}}},
                { runValidators: true, new: true}
            );

            if(!friend) {
                res.status(400).json({ message: 'Unable to find friend Data user'})
            };

            res.json(friend)
            console.log('end')

        } catch (err) {
            res.status(500).json({ message: 'Unable to delete friend'});
            console.log(err)

        }
    }

};



