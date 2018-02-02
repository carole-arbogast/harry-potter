var Character   = require("../models/character"), 
    Comment     = require("../models/comment"); 

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next(); 
    }
    res.redirect("/login"); 
}

middlewareObj.checkCharacterOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        // find character
        Character.findById(req.params.id, function(err, foundCharacter){
            if(err){
                console.log(err); 
            } else {
                // check if character author = logged user 
                console.log(foundCharacter); 
                if(foundCharacter.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    res.redirect("/characters"); 
                }
            }
        })
    } else {
        res.redirect("/login"); 
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err); 
            } else {
                console.log(foundComment.author); 
                if(foundComment.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    res.redirect("/characters"); 
                }
            }
        })
    } else {
        res.redirect("/login"); 
    }
}

module.exports = middlewareObj; 