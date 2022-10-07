const express= require('express')
//const authorize=require('../middleware/auth')
const a = require("../views/indexFile")
const games = require("../controllers/game.controller.js");
 const router= express.Router()

    // Create a new product instance
    router.post("/:league_id/newgame", games.create);
    // Add new game
    router.get("/:league_id/newgame", games.addGame);
    // Retrieve a single product with id
    // router.get("/products/:Id", products.findOne);
    // // Update a product with id
    // router.put("/products/:Id", products.update);
    // // Delete a product with id
    // router.delete("/products/:Id", products.delete);
    // //filter through products array
    // router.get("/api/filter", products.filterProduct);
    
module.exports= router    
  
  