const express= require('express')
//const authorize=require('../middleware/auth')
const users = require("../controllers/user.controller.js");
 const router= express.Router()

    // Create a new user instance
    router.post("/:league_id", users.create);
    //  Retrieve user instance details
     router.get("/:league_id/user/:user_id", users.userDetails);
    // // Retrieve a single product with id
    // router.get("/products/:Id", products.findOne);
    // // Update a product with id
    // router.put("/products/:Id", products.update);
    // // Delete a product with id
    // router.delete("/products/:Id", products.delete);
    // //filter through products array
    // router.get("/api/filter", products.filterProduct);
    
module.exports= router    
  
  