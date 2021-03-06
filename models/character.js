var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
    photo: String, 
    name: String, 
    occupation: String, 
    house: String, 
    description: String, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }, 
        username: String
    },
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
})

module.exports = mongoose.model("Character", characterSchema); 