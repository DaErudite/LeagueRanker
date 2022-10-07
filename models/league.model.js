const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    
    leagueName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    refreshToken:{
        type:String,
        default:'',
        select: false
    }
},{timestamp: true});


const League = mongoose.model('League', leagueSchema);
module.exports = League;