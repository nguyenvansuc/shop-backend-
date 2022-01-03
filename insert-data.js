// const { MongoClient } = require("mongodb");
import {MongoClient} from 'mongodb'
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://shop-online:shop-online@cluster0.98vlq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "test";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("users");
         // Construct a document                                                                                                                                                              
         let personDocument = {
            "username":"admin",
            "password":"111",
            "rules":"admin"
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);