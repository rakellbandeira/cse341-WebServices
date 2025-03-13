const {MongoClient} = require('mongodb');
require ('dotenv').config();

async function main() {
/*   const uri = "mongodb+srv://rakelldesigner:78726217@clusterrakell.vkmmx.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRakell";
 */

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");


    await listDatabases(client);

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  } 
}

main().catch(console.error);

/* LIST THE DATABASE IN OUR CLUSTER */

async function listDatabases(client) {
  const dataBasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  dataBasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  })
}