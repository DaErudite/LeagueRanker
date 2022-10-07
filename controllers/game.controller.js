const Game= require('../models/game.model')
const User= require('../models/user.model')
const League = require('../models/league.model')




exports.addGame=(req,res)=>{
    const id= req.params.league_id
    res.render('gameDetails',{id});
}

//add a game
exports.create= async(req,res)=>{
    try{


    let competitor1 = req.body.competitor1;
    let competitor2 = req.body.competitor2;

    let competitor1Score = req.body.competitor1Score;
    let competitor2Score = req.body.competitor2Score;  
         
    console.log(req.params.league_id);
    const leagueID=req.params.league_id
    const gottenLeague= await League.findById(req.params.league_id)
    const league = gottenLeague.leagueName
    console.log(league)
    const game = new Game({ competitor1, competitor2, league, competitor1Score, competitor2Score, leagueID});

// Save game in the database
const savedGame = await game.save();
    if (savedGame) {

        //add updateRating for User model controller here
        let k= 400
        
         User.findOne({name:competitor1, league}, (err,user1)=>{
            User.findOne({name:competitor2, league},(err, user2)=>{
            

            const rating1= user1.rating
            const rating2= user2.rating
            console.log(rating1, rating2)

            P1 = rating1 / (rating1+rating2)
            console.log(P1)
            P2 = rating2 / (rating1+rating2)


            if (user1) {
                console.log(user1)
                console.log(user2)

                const newRating1= rating1 + k*(competitor1Score - P1)
                const newRating2= rating2 + k*(competitor2Score - P2)
                console.log(newRating1,newRating2)
                
                User.findByIdAndUpdate(user1._id,{
                    rating: newRating1
                }, {new: true})
                .then(foundUser1 => {
                    if(!foundUser1) {
                        return res.status(404).send({
                            message: "user not found with id " + user1._id
                        });
                    }
                })

                
                 User.findByIdAndUpdate(user2._id,{
                    rating:  newRating2
                }, {new: true})
                .then(foundUser2 => {
                    if(!foundUser2) {
                        return res.status(404).send({
                            message: "USer not found with id " + user2._id
                        });
                    }
                    res.redirect('/leagues/'+leagueID)
                    //res.send(foundUser2);
                })

            
            //    return res.status(400).json({
            //        msg:"user found"})
                 }
            })

            
            })

    


    //   return res.status(201).json({
    //     msg: 'new game saved',
    //     success: true,
    //     game: savedGame
    //   });
    }
}
catch(err) {
    res.status(500).send({
        message: err.message || "Error occurred."
        });
    };

};
