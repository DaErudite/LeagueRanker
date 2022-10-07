const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        default: 1500
    },
    league:{
        type: String,
        required: true
    },
    leagueID:{
        type: String,
        required: true
    }},{timestamp:true}
);


const User = mongoose.model('User', userSchema);
module.exports = User;