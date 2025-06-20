const express = require('express')
const cors =require("cors")
const bodyparser=require("body-parser")
const dotenv=require('dotenv')
dotenv.config()
const app = express()
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const port = 3000
const dbname="PassPocket"
client.connect();
app.use(cors())
app.use(bodyparser.json())
app.get('/', async (req, res) => {
    const db=client.db(dbname)
    const collection=db.collection("passwords")
    const findResult=await collection.find({}).toArray()
  res.json(findResult)
})
app.post('/', async (req, res) => {
    const password=req.body
    const db=client.db(dbname)
    const collection=db.collection("passwords")
    const findResult=await collection.insertOne(password)
  res.send({success:true, result:findResult})
})
app.delete('/', async (req, res) => {
    const password=req.body
    const db=client.db(dbname)
    const collection=db.collection("passwords")
    const findResult=await collection.deleteOne(password)
  res.send({success:true, result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
