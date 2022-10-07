const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    
    competitor1:{
        type: String,
        required: true
    },
    competitor2:{
        type: String,
        required: true
    },
    league:{
        type: String,
        required: true
    },
    competitor1Score:{
        type: Number,
        required: true
    },
    competitor2Score:{
        type: Number,
        required: true
    },
    leagueID:{
        type: String,
        required: true
    }},{timestamp:true}
);


const Game = mongoose.model('Game', gameSchema);
module.exports = Game;