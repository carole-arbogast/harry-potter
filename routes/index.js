var express     = require("express"), 
    router      = express.Router(), 
    User        = require("../models/user"), 
    passport    = require("passport"); 
    

// ROOT ROUTE

router.get("/", function(req, res){
    res.redirect("/characters"); 
})

// REGISTER

router.get("/register", function(req, res){
    res.render("register"); 
})

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message); 
            return res.redirect("/register"); 
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Hogwarts!")
            res.redirect("/characters"); 
        })
        

    })
})

// LOGIN

router.get("/login", function(req, res){
    res.render("login"); 
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/characters",
    failureRedirect: "/login", 
    successFlash: true, 
    failureFlash: true
}) ,function(req, res){
});

// LOGOUT

router.get("/logout", function(req, res){
    req.logout(); 
    req.flash("success", "Mischief accomplished"); 
    res.redirect("/characters"); 
})

module.exports = router; 