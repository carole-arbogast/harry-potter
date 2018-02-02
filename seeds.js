var mongoose = require("mongoose");
var Character = require("./models/character"); 
var Comment = require("./models/comment"); 

var data = [{
            name: "Hermione Granger", 
            photo: "http://markandrewholmes.com/hermione.jpg", 
            occupation: "Student", 
            house: "Gryffindor", 
            description: "Loves books. Saves Harry all the time. Practically lives in the library."
        }, 
        
        {
            name: "Draco Malfoy", 
            photo: "https://i.pinimg.com/736x/e8/15/77/e81577e73621b5bf42b2fd44592099a4--harry-potter-toms-harry-potter-film.jpg",
            occupation: "Student", 
            house: "Slytherin", 
            description: "Blond and arrogant. Best friends with two gorillas. His father will hear about this. "
        }, 
        
        {
            name: "Luna Lovegood", 
            photo: "https://vignette.wikia.nocookie.net/harrypotter/images/2/22/Lion_Lovegood.jpg/revision/latest?cb=20161205045231",
            occupation: "Student", 
            house: "Ravenclaw", 
            description: "Reads the Quibler upside down. Will belive anything as long as there's no proof of it."
        }
    ]
    
function seedDB(){
    // remove all characters
    Character.remove({}, function(err){
        if(err){
            console.log(err); 
        }
        console.log("removed characters");
        Comment.remove({}, function(err){
            if(err){
                console.log(err); 
            }
            console.log("removed comments"); 

        // add new characters
        data.forEach(function(seed){
            Character.create(seed, function(err, character){
                if(err){
                    console.log(err); 
                } else {
                    console.log("New character created");
                    // create and add comment
                    Comment.create(
                        {
                            text: "This character's great!", 
                            author: "Potterhead"
                        }, function(err, comment){
                            if(err){
                                console.log(err); 
                            } else {
                                character.comments.push(comment._id); 
                                character.save(); 
                                console.log("Comment created"); 
                            }
                        })
                    }
                })
            })
        })
        
    })
}

module.exports = seedDB;