import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "mongodb+srv://0xtornado650:Nonunstable10$@cluster0.fmh5a0s.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  connectTimeoutMS: 100000,
  serverSelectionTimeoutMS: 100000
});

let conn;
//let db;
try {
  conn = await client.connect();
  //db = await conn.db("Cluster0");
} catch(e) {
  console.error(e);
}

let db = conn.db("Cluster0");

export default db;