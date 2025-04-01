import { MongoClient, ServerApiVersion } from 'mongodb';

// create client
const client = new MongoClient(process.env.CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// close connection when application terminated by keyboard
process.on('SIGINT', ()=>{
  client.close();
  console.log("closed database connection!");
  process.exit(1);
})

// Create connection and database for use in other scripts
let connection = client.connect();
const database = client.db('term-project');  

export { connection, database };