
const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const Tweets = require("../models/tweets.model");

const validateTweets = require("../validators/validateTweets");

router.get("/", async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;

        const tweets = await Tweets.find().skip(skip).limit(per_page);
        if(!tweets) return res.status(400).json({msg: "No Tweets found"})
        res.status(200).json(tweets);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.get("/total", async (req,res)=>{
    try{
        const total = await Tweets.find({}).count();
        if(!total) return res.status(400).json({msg: "No Tweets found"})
        res.status(200).json(total);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }

})

router.get("/:user_id", async (req,res)=>{
    try{
        const tweets = await Tweets.find({user_id: req.params.user_id});
        if(!tweets) return res.status(400).json({msg: "No Tweets found"})
        res.status(200).json(tweets);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }

})
router.get("/:title", async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;

        const tweets = await Tweets.find({title: req.params.title}).skip(skip).limit(per_page);
        if(!tweets) return res.status(400).json({msg: "No Tweets found"})
        res.status(200).json(tweets);
    }
    catch(err){
       return res.status(400).json({msg: "Something went wrong!"})
    }

})

router.post("/", ...validateTweets(),async (req,res)=>{

    try{

        // *Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
           return res.status(400).json({errors: errors.array()})
        }
        
        // *Create Tweets
        const doesUserIDExist= await Tweets.findOne({user_id: req.body.user_id})
        if(doesUserIDExist) return res.status(400).json({msg: "Duplicate User_ID found"})
        const tweet = await Tweets.create({
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            user_id: req.body.user_id
        })

        if(!tweet) return res.status(400).json({msg: "No Tweets Created"})
        return res.status(200).json(tweet);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.delete("/:user_id", async (req,res)=>{
    try{
        const tweet = await Tweets.findOneAndDelete({ user_id: req.params.user_id })
        if(!tweet) return res.status(404).json({msg: "Tweets not found"})
        res.status(200).json(tweet)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.patch("/:user_id", async (req,res)=>{
    try{
        if(!req.body.title) return res.status(400).json({msg: "Title is required"});
        const tweet = await Tweets.findOneAndUpdate({ 
            user_id: req.params.user_id 
        },{
            $set: {
                title: req.body.title,
                body: req.body.body,
                tags: req.body.tags
            }
        },{
            returnOriginal: false
        }
            )
        if(!tweet) return res.status(404).json({msg: "Tweets not found"})
        res.status(200).json(tweet)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

module.exports = router;