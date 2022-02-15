

 const mongoose = require("mongoose");

 // Schema

 const TweetSchema = new mongoose.Schema({
     title: {type: String, required: true},
     body: {type: String, required: true},
     tags: {type: Array, required: true},
     user_id: {type: String, required: true}
 })

 const Tweets = mongoose.model("tweets",TweetSchema);

 module.exports = Tweets;