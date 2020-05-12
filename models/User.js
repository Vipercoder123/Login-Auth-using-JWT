const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    member: {
        type: Boolean,
        default: false
    },
    avatar:{
        type:String,    
    },
    date: {
        type: Date,
        default: Date.now
    },
    hasposted: {
        type: Boolean,
    },
    score: {
        type: Number,
    }
});

module.exports = User = mongoose.model('user', UserSchema);