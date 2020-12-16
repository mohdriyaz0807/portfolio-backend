const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors")

require('dotenv').config()

const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const app = express();
const dbURL = process.env.DB_URL ||"mongodb://127.0.0.1:27017";
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json());

app.get("/get",async (req,res)=>{
    try{
        let clientInfo = await mongoClient.connect(dbURL);
        let db=clientInfo.db("portfolio");
        let result = await db.collection("user").findOne({
            _id: objectId("5fd9b9e2e650a353ae786c98")
        });
        res.status(200).json({message: "Try to edit",result});
        clientInfo.close();
    }catch(err){
        console.log(err);
        res.send(500)
    }
})

app.put("/edit",async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db("portfolio");
        let data = await db.collection("user").updateOne({
            _id: objectId("5fd9b9e2e650a353ae786c98")
        },{$set:req.body});
        res.status(200).json({message: "User updated"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
})


app.listen(port, () => console.log("your app runs with port:",port));