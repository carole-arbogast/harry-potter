var express     = require("express"), 
    router      = express.Router({mergeParams: true}), 
    Character   = require("../models/character"), 
    Comment     = require("../models/comment"),
    middleware  = require("../middleware"); 

// NEW ROUTE 

router.get("/new", middleware.isLoggedIn, function(req, res){
    Character.findById(req.params.id, function(err, character){
        console.log(character); 
        if(err){
            res.render("error"); 
            console.log(err); 
        } else {
            res.render("comments/new", {character: character}); 
        }
    })
})

// CREATE ROUTE

router.post("/", middleware.isLoggedIn, function(req, res){
    Character.findById(req.params.id, function(err, character){
        if(err){
            res.render("error"); 
            console.log(err); 
        } else {
            // create comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    res.render("error"); 
                    console.log("error"); 
                } else {
                    // push comment into array
                    character.comments.push(comment); 
                    character.save(); 
                    res.redirect("/characters/" + character._id)
                }
            })
        }
    })
})


module.exports = router; 