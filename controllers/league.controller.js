const Game = require('../models/game.model');
const League = require('../models/league.model')
const User = require('../models/user.model')

exports.create= (req,res)=>{
    console.log('it works')
   const league = new League(req.body);

// Save product in the database
league.save()
.then(data => {
    console.log(data);
    res.redirect('./leagues')
}).catch(err => {
    res.status(500).send({
        message: err.message || "Error occurred."
        });
    });

};




//login to edit a league as an admin
exports.login = async(req, res) => {
    try{
    
      const { leagueName, password } = req.body;
      console.log({leagueName})
      const foundLeague = await League.findById(req.params.league_id ).select('+password');
      if (!foundLeague)
        return res
          .status(400)
          .json({ success: false, msg: 'Invalid credentials' });
  
      // compare password with hashed password
      const validPassword =await bcrypt.compare(password, foundLeague.password);
      if (!validPassword)
        return res
          .status(400)
          .json({ success: false, msg: 'Invalid credentialsss' });
  
      // create an access token
     const accessToken= jwt.sign({ id: foundLeague._id, league: req.body.leagueName },  process.env.ACCESS_JWT_SECRET, {expiresIn: '15m'})


     //create a refresh token   
     const refreshToken= jwt.sign({ id: foundLeague._id, league:req.body.leagueName },  process.env.REFRESH_JWT_SECRET, {expiresIn: '1d'})

        foundLeague.refreshToken= refreshToken
        await foundLeague.save()

        res.cookie('jwt', refreshToken, {
            httpOnly:true,
             maxAge: 24*60*60*1000,
             sameSite:'None',
             secure:true
        })

        return res.status(200).json({msg:"Login successful", accessToken}) 
    } catch (error) {
       console.log(error.message);
       return res.status(400).json({
         msg: 'Login failed',
         success: false
       });
     }
  };
  




exports.logout = (req, res) => {
    return res
      .clearCookie('jwt')
      .status(200)
      .json({ success: true, msg: 'Log out successful' });
  };



// Refresh Token
exports.TokenRefresher = async(req, res) => {
    try{
      const cookie =req.cookies;
      if (!cookie?.jwt) {
        return res.status(401).json({
          success: false,
          msg: 'Access denied! Log in/Sign in',
        });
      }
      const refreshToken= cookie.jwt
      console.log(cookie)
      //check for league in db
      const league = await League.findOne({ refreshToken });
      if (!league)
        return res
          .status(401)
          .json({ success: false, msg: 'Sign/Log In first' });

     // if user exists
    jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err,decoded)=>{
         if (err || league._id != decoded.id){
            console.log(decoded.id)
             return res.status(403).json({msg:'Error occured'})
                         
         } 

         //create access token
        const accessToken= jwt.sign({ id: user._id, role:"ADMIN" },  process.env.ACCESS_JWT_SECRET, {expiresIn: '15m'})

  
        return res.status(200).json({accessToken}) 
     })
  
    
    } catch (error) {
       console.log(error.message);
       return res.status(400).json({
         msg: 'Login failed',
         success: false
       });
     }
  };




// Retrieve all leagues
exports.findAll= (req, res) => {
    League.find()
    .then((result) => {
        res.render('index', {title: 'All leagues', leagues: result})
        //res.send({leagues:result});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving leagues."
        });
    });
};

exports.findAllJSON=(req, res) => {
  League.find()
  .then((result) => {
      res.send(result)
      //res.send({leagues:result});
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving leagues."
      });
  });
};

exports.leagueDetails=async(req,res)=>{
  const id= req.params.league_id;
  //const league= await League.findById(id)

  const leagueGames= await Game.find({leagueID:id})
  console.log(leagueGames)
  
  User.find({leagueID:id})
      .then(result=>{
          console.log(result)
          res.render('leagueDetails', {users: result, games:leagueGames, id, title:'League details'});
      })
      .catch(err =>{
          console.log('error occured');
      })
}