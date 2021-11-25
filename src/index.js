const cors = require("cors");
const express = require("express");
const app = express();
app.use(
    cors({
        credentials: true,
       origin: "*",
    })
 );
 app.use(express.json());
 const mongoose = require("mongoose");
 const conn_url="mongodb+srv://ramsonti:ram.sonti@tinny.bajlt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 const db = mongoose.createConnection(conn_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });
 const userSchema = new mongoose.Schema({
    username: String,
    url: String,
    createdDateTime: String
 });
 const user = db.model("Users", userSchema);
 app.post("/getUrl",async (req,res)=>{
     console.log("get url")
     const {username,url}=req.query;
     console.log("get url",url,username)
     const newUser = new user({
        username,
        url,
        createdDateTime:new Date().toLocaleString(),
     });
     await newUser.save();
     res.send(url);
 })
app.get("/",async (req,res)=>{
    console.log("server is heated");
    const {username}=req.query;
    const url = await user.find({
        username: username
     },{url:1,_id:0});
     if(url!==null && url!=undefined){
        // res.status(301).send({"Location":url[0].url});
        res.writeHead(301,{"Location":url[0].url})
        res.end();
     }else{
         res.send({url:"not found"});
     }
    // res.send("server is working fine");
})



 app.listen(process.env.PORT || 3000);
//  app.listen(3000,()=>{
//      console.log("server started.........");
//  });





