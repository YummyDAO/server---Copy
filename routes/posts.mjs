import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import dogecore from "bitcore-lib-doge"
//const dogecore = require('bitcore-lib-doge')
const { PrivateKey, Address, Transaction, Script, Opcode } = dogecore
const { Hash, Signature } = dogecore.crypto

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = {txid: Number(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.get("/confirmed/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = {txid: Number(req.params.id)};
  let result = await collection.findOne(query);
  let result1 = result.bridged;

  if (!result) res.send("Not found").status(404);
  else res.send(result1).status(200);
});

router.get("/completed/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = {txid: Number(req.params.id)};
  let result = await collection.findOne(query);
  let result1 = result.completed;

  if (!result) res.send("Not found").status(404);
  else res.send(result1).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("posts");
  let collection1 = await db.collection("posts2");
  let newDocument = req.body;
  console.log(newDocument, "newDocument")
  const privateKey = new PrivateKey()
  const privkey = privateKey.toWIF()
  const address = privateKey.toAddress().toString()
  //console.log(privkey, "privatekey")
  //console.log( address, "address")
  newDocument.date = new Date();
  let newDocument1 = {multipv: privkey, multiwallet: address}
  //newDocument.multipv = privkey;
  newDocument.multiwallet = address;
  let result = await collection.insertOne(newDocument);
  let result1 = await collection1.insertOne(newDocument1);
  console.log(result1, result1)
  res.send(result).status(204);
});


export default router;
