const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimm: true,
        },
        email: {
            type:String,
            unique: true,
            required: [true, 'Email is required'],
            validate:  {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'thought',
            },
          ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'friend',
            },
          ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;