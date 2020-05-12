const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
    },
    text2: {
        type: String,
    },
    text4: {
        type: String,
    },
    text4: {
        type: String,
    },
    text5: {
        type: String,
    },
    text6: {
        type: String,
    },
    text7: {
        type: String,
    },
    text8: {
        type: String,
    },
    text9: {
        type: String,
    },
    text10: {
        type: String,
    },
    text11: {
        type: String,
    },
    text12: {
        type: String,
    },
    text13: {
        type: String,
    },
    text14: {
        type: String,
    },
    text15: {
        type: String,
    },
    name:{
        type:String,
    },
    avatar:{
        type: String
    },
    likes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments: [
        {
        user: {
            type: Schema.Types.ObjectId,
            ref:'users'
        },
        text:{
            type: String,
            required: true
        },
        name:{
            type:String,
        },
        avatar:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now,
        }
    }
    ],

    date:{
        type: Date,
        default: Date.now,
    }
});

module.exports = Post = mongoose.model('post', PostSchema);