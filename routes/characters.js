var express     = require("express"), 
    router      = express.Router(), 
    Character   = require("../models/character"), 
    middleware  = require("../middleware"), 
    passport    = require("passport"); 

// INDEX ROUTE 

router.get("/", function(req, res){
    Character.find({}, function(err, characters){
        if(err){
            console.log(err);
        } else {
            res.render("characters/index", {characters: characters}); 
        }
    })
 ; 
})

// NEW ROUTE

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("characters/new"); 
})

// CREATE ROUTE

router.post("/", middleware.isLoggedIn, function(req, res){
    var character = req.body.character;
    character.author = {
        id: req.user._id,
        username: req.user.username
    };
    Character.create(character, function(err, character){
        console.log(character.author.username); 
        if(err){
            res.redirect("/characters"); 
        } else {
            res.redirect("/characters"); 
        }
    })
})

// SHOW ROUTE

router.get("/:id", function(req, res){
    Character.findById(req.params.id).populate("comments").exec(function(err, character){
        if(err){
            res.render("error"); 
        } else {
            res.render("characters/show", {character: character}); 
        }
    })
})

// EDIT ROUTE

router.get("/:id/edit", middleware.checkCharacterOwnership, function(req, res){
    Character.findById(req.params.id, function(err, character){
        if(err){
            res.render("error"); 
        } else {
            res.render("characters/edit", {character: character})
        }
    })
})

// UPDATE ROUTE

router.put("/:id", middleware.checkCharacterOwnership, function(req, res){
    Character.findByIdAndUpdate(req.params.id, req.body.character, function(err, character){
        if(err){
            res.render("error"); 
        } else{
            res.redirect("/characters/" + req.params.id); 
        }
    })
})

// DELETE ROUTE

router.delete("/:id", middleware.checkCharacterOwnership, function(req, res){
    Character.findByIdAndRemove(req.params.id, function(err, character){
        if(err){
            res.render("error"); 
        } else {
            res.redirect("/characters"); 
        }
    })
})

module.exports = router; 