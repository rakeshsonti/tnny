const cors = require("cors");
const express = require("express");
const app = express();
app.use(
    cors({
       credentials: true,
       origin: "http://localhost:3000",
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
    createdDateTime: Date
 });
 const user = db.model("Users", userSchema);
 app.post("/getUrl", async (req, res) => {
    const { url } = req.body;
app.get("/",(req,res)=>{
    console.log("server is heated")
    res.send("server is working fine");
})
 });


 app.listen(process.env.PORT);
//  app.listen(8080);





