const express= require('express')
//const authorize=require('../middleware/auth')
const leagues = require("../controllers/league.controller.js");
 const router= express.Router()

    // Create a new product instance
    router.post("/", leagues.create);
    // Retrieve all products
    router.get("/", leagues.findAll);
    //Retrieve a specific league details
    router.get("/myjson", leagues.findAllJSON)
    // Retrieve league details
    router.get("/:league_id", leagues.leagueDetails)
    
    
module.exports= router    
  
  