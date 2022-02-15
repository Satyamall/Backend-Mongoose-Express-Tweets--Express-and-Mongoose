


const express=require("express");
const app =express();
const cors= require('cors');
const connect = require('./config/db');
const userRouter = require('./routes/users.route');
const tweetRouter = require('./routes/tweets.route');

const PORT=3000;

//cors
app.use(cors());
app.use(express.json())

// *routers for users and tweets
app.use("/users", userRouter);
app.use("/tweets",tweetRouter);

const start= async ()=>{
    await connect();
    app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`);
    })
}

module.exports=start;