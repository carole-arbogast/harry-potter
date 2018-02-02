// CONFIG 

var methodOverride          = require("method-override"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    express                 = require("express"),
    app                     = express(),
    flash                   = require("connect-flash"),
    Character               = require("./models/character"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    passport                = require("passport"), 
    LocalStrategy           = require("passport-local"), 
    passportLocalMongoose   = require("passport-local-mongoose"), 
    seedDB                  = require("./seeds");
    
var indexRoutes     = require("./routes/index"), 
    characterRoutes = require("./routes/characters"), 
    commentRoutes   = require("./routes/comments"); 
    
mongoose.connect("mongodb://localhost/harry_potter");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash()); 

app.use(require("express-session")({
    secret: "Tiny potato is tiny",
    resave: false,
    saveUninitialized: false
}));

// Passport Configuration

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success"); 
    next(); 
})


app.use("/", indexRoutes); 
app.use("/characters", characterRoutes); 
app.use("/characters/:id/comments", commentRoutes); 






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
})