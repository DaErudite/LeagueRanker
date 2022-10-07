require('dotenv').config()
const User = require('../models/user.model.js')
const League= require('../models/league.model.js')
const Game= require('../models/game.model.js')
//const jwt=require('jsonwebtoken')
//const { userValidation,  loginValidation } = require ('../validations/user.validation.js');
//const bcrypt= require('bcrypt')





exports.create= async(req,res)=>{
    try{

    let  name  = req.body.name;

    const andQuery = { $and:[{'name': req.body.name}, {'leagueID':req.params.league_id}]}
    const user=await User.findOne(andQuery)
    if (user) {
        console.log(user)
       return res.status(400).json({
           msg:"name already exists"})
        } else{

            rating = 1500
            console.log(req.params.league_id)
            const leagueID= req.params.league_id
            const gottenLeague=await League.findById(req.params.league_id)
            const league = gottenLeague.leagueName
            console.log(name, rating, league, leagueID)
            
            const user = new User({ name, rating, league, leagueID});
        
            // Save user in the database
            const savedUser = user.save();
            if (savedUser) {
        
              const id= req.params.league_id
              res.redirect('./'+id)
            }
        
        }
    
  
    
}
catch(err) {
    res.status(500).send({
        message: err.message || "Error occurred."
        });
    };

};


exports.userDetails= async(req,res)=>{
    const id=req.params.user_id;

    const foundUser= await User.findById(id);
    const league= await League.findById(req.params.league_id)
    const leagueName= league.leagueName;
    const gottenUserName= foundUser.name;
    
    const ORquery = { $or:[{'competitor1':gottenUserName}, {'competitor2':gottenUserName}]};
    const completeQuery={ $and:[{'league':leagueName}, ORquery] }

    const foundGame= await Game.find(completeQuery)
        if(foundGame){
        console.log(foundGame)
       res.render('userDetails', {games: foundGame, title:'User details'})
    }


}

