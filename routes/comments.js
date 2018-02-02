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
    // find right campground
    Character.findById(req.params.id, function(err, character){
        if(err){
            console.log(err); 
            res.redirect("/characters");
            //create comment
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err); 
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username; 
                    comment.save(); 
                    // put comment in campground
                    character.comments.push(comment._id); 
                    // save campground
                    character.save(); 
                    // redirect user
                    res.redirect("/characters/" + character._id); 
                }
            });
        }
    });
});

// EDIT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err); 
        } else {
            res.render("comments/edit", {character_id: req.params.id, comment: foundComment}); 
        }
    })
})

// UPDATE ROUTE

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            console.log(err); 
        } else {
            res.redirect("/characters/" + req.params.id); 
        }
    })
})

// DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err); 
        } else {
            res.redirect("/characters/" + req.params.id); 
        }
    })
})

module.exports = router; 