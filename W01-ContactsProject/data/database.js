//import a library called dotenv which helps us to read our connection string in
// when we are not in the production environmens.
const dotenv = require('dotenv');
dotenv.config();

//now import our mongo client
const MongoClient = require('mongodb').MongoClient;

//now declare a variable for our database
let database;

//and set up the initDb function that we made
const initDb = (callback) => {
    //if the databse is set up
    if(database) {
        console.log('Db is already initialized');
        return callback(null, database);

    }   //otherwise, we are gonna call MongoDb connect
        // and we are gonna use this URI here.
        //Then, if it is successfull, we gonna set the client
        //This returns from Mongo to the database variable here
        //Otherwise, we are gonna return the err
        MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });

};

const getDatabase = () => {
    if(!database) {
        throw Error("Database not initialized")
    }
    return database;
}

module.exports = {
    initDb,
    getDatabase
};
