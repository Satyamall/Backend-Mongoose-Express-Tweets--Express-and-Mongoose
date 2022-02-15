
const mongoose  = require("mongoose");

//Schema
const UserSchema= new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
})

//Models
// const User= mongoose.model("User",UserSchema, "users");
// *or
const Users= mongoose.model("users",UserSchema);

module.exports=Users;