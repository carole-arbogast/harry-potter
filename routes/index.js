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
            console.log(err); 
            res.render("error"); 
        } 
        passport.authenticate("local")(req, res, function(){
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
    failureRedirect: "/login"
}) ,function(req, res){
});

// LOGOUT

router.get("/logout", function(req, res){
    req.logout(); 
    res.redirect("/characters"); 
})

module.exports = router; 