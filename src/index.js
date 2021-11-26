const cors = require("cors");
const express = require("express");
const app = express();
app.use(
    cors()
 );
 app.use(express.json());
 const mongoose = require("mongoose");
 const conn_url="mongodb+srv://ramsonti:ram.sonti@tinny.bajlt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 const db = mongoose.createConnection(conn_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });
 const userSchema = new mongoose.Schema({
    url:String,
    newUrl: String,
    hashcode:String,
    createdDateTime: String
 });
 const user = db.model("Users", userSchema);
 const crypto = require("crypto");
const randomValueHex1=function (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
}
const randomValueHex2=function (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toLowerCase();   // return required number of characters
}
const generateUniqueKey=function(){
    const str = randomValueHex2(4)+"-"+randomValueHex1(4);
    console.log(str);
    return str;
}
 app.get("/getUrl",async (req,res)=>{
     console.log("get url")
     const {url}=req.query;
     if(url===undefined||url===null){
        res.send({url:"Invalid url"});
    }else{
        const curr_url = await user.find({
            url
         },{newUrl:1,_id:0});
         if(curr_url[0]!==null && curr_url[0]!=undefined){
            res.send({url:curr_url[0].newUrl});
         }else{
            let hashcode=null;
            let isUnique=false;
            while(!isUnique){
                hashcode=await generateUniqueKey();
                const curr_hashcode = await user.find({
                    hashcode
                 },{_id:1});
                 console.log(curr_hashcode)
                 if(curr_hashcode[0]===null || 
                    curr_hashcode[0]===undefined || curr_hashcode[0]==="" ||curr_hashcode[0]==[] ){
                    isUnique=true;
                    break;
                 }
            }
            let newGenUrl=req.protocol+"://"+req.hostname+":"+3000+"/"+hashcode;
            console.log(newGenUrl);
             const newUser = new user({
                url,
                newUrl:newGenUrl,
                hashcode:hashcode,
                createdDateTime:new Date().toLocaleString(),
             });
             await newUser.save();
             res.send({url:newGenUrl});
         }
    }
 })
 
app.get("/",async (req,res)=>{
    console.log("server is heated");
    const {newUrl}=req.query;
    
    if(newUrl===undefined||newUrl===null){
        res.send({url:"Invalid url"});
    }else{
    const curr_url = await user.find({
        newUrl
     },{url:1,_id:0});
     if(curr_url[0]!==null && curr_url[0]!=undefined){
         console.log(curr_url)
        res.writeHead(301,{"Location":curr_url[0].url})
        res.end();
     }else{
         res.send({url:"not found"});
     }
    // res.send("server is working fine");
    }
})



 app.listen(process.env.PORT || 3000);
//  app.listen(3000,()=>{
//      console.log("server started.........");
//  });





