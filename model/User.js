const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    profilePic: { type: String, default: " " },
    email: { type: String, required: true },
    bio: { type: String, maxlength: 120 },
    password:{type:String},
    posts: { type: [{ type: mongoose.Schema.ObjectId, ref: "Posts" }],default: [] },
    date:{
        type:Date, 
        default:Date.now
    }
})

module.exports=mongoose.model("Users",UserSchema)
